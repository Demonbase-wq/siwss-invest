// import { dailyProfits, investmentsTable, users } from "@/lib/airtable";
// import { DateTime } from "luxon";
// import { NextRequest } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     // Fetch all active investments
//     const activeInvestments = await investmentsTable
//       .select({
//         filterByFormula: "{status} = 'Active'",
//       })
//       .all();

//     for (const investment of activeInvestments) {
//       const { id, fields } = investment;
//       const { amount, roi, duration, user_id }: any = fields;

//       const totalROI = parseFloat(amount || "0") * parseFloat(roi || "0"); // Total expected profit
//       const totalDays = parseInt(duration || "0"); // Duration in days

//       if (!user_id || !totalROI || !totalDays) {
//         console.warn(`Skipping invalid investment ID: ${id}`);
//         continue;
//       }

//       // Fetch the user associated with the investment to get their timezone
//       const user = await users.find(user_id as string);
//       const timezone = user.fields.timezone || "UTC";

//       // Get today's date in the user's timezone
//       const today = DateTime.now()
//         .setZone(timezone as string)
//         .toISODate(); // YYYY-MM-DD

//       // Ensure the `date` field is stored in ISO 8601 format and compare properly
//       const existingProfit = await dailyProfits
//         .select({
//           filterByFormula: `AND({investment_id} = '${id}', IS_SAME({date}, '${today}', 'day'))`,
//         })
//         .firstPage();

//       console.log(existingProfit);

//       if (existingProfit.length === 0) {
//         // Calculate remaining profit and days
//         const allDailyProfits = await dailyProfits
//           .select({
//             filterByFormula: `{investment_id} = '${id}'`,
//           })
//           .all();

//         const totalGeneratedProfit = allDailyProfits.reduce(
//           (sum, record) =>
//             sum + parseFloat((record.fields.profit as string) || "0"),
//           0
//         );
//         const remainingProfit = totalROI - totalGeneratedProfit;
//         const remainingDays = totalDays - allDailyProfits.length;

//         if (remainingDays > 0) {
//           const dailyProfit =
//             remainingDays === 1
//               ? remainingProfit // On the last day, assign all remaining profit
//               : parseFloat(
//                   (
//                     Math.random() *
//                     ((remainingProfit / remainingDays) * 1.5)
//                   ).toFixed(2)
//                 );

//           // Save daily profit to Airtable
//           await dailyProfits.create({
//             investment_id: id,
//             date: today as string, // Airtable will recognize this as a valid date
//             profit: dailyProfit,
//           });

//           console.log(
//             `Generated daily profit of $${dailyProfit.toFixed(
//               2
//             )} for investment ID: ${id} on ${today}`
//           );
//         }
//       } else {
//         console.log(
//           `Profit for ${today} already exists for investment ID: ${id}`
//         );
//       }
//     }

//     return Response.json(
//       { message: "Generated daily profit for investments" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error generating daily profits:", error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
import { dailyProfits, investmentsTable, users } from "@/lib/airtable";
import { DateTime } from "luxon";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Fetch all active investments
    const activeInvestments = await investmentsTable
      .select({
        filterByFormula: "{status} = 'Active'",
      })
      .all();

    for (const investment of activeInvestments) {
      const { id, fields } = investment;
      const { amount, roi, duration, user_id, start_date }: any = fields;

      const totalROI = parseFloat(amount || "0") * parseFloat(roi || "0"); // Total expected profit
      const totalDays = parseInt(duration || "0"); // Duration in days

      if (!user_id || !totalROI || !totalDays) {
        console.warn(`Skipping invalid investment ID: ${id}`);
        continue;
      }

      // Fetch the user associated with the investment to get their timezone
      const user = await users.find(user_id as string);
      const timezone = user.fields.timezone || "UTC";

      // Get today's date in the user's timezone
      const today = DateTime.now().setZone(timezone as string).toISODate(); // YYYY-MM-DD
      const investmentStartDate = DateTime.fromISO(start_date).setZone(timezone as string);
      const daysElapsed = Math.floor(DateTime.now().diff(investmentStartDate, "days").days);

      // Ensure the `date` field is stored in ISO 8601 format and compare properly
      const existingProfit = await dailyProfits
        .select({
          filterByFormula: `AND({investment_id} = '${id}', IS_SAME({date}, '${today}', 'day'))`,
        })
        .firstPage();

      if (existingProfit.length === 0) {
        // Calculate profits generated so far and remaining profit
        const allDailyProfits = await dailyProfits
          .select({
            filterByFormula: `{investment_id} = '${id}'`,
          })
          .all();

        const totalGeneratedProfit = allDailyProfits.reduce(
          (sum, record) =>
            sum + parseFloat((record.fields.profit as string) || "0"),
          0
        );

        const remainingProfit = totalROI - totalGeneratedProfit;
        const remainingDays = totalDays - allDailyProfits.length;

        if (remainingDays > 0) {
          let dailyProfit;

          if (daysElapsed < 5) {
            // Calculate daily profit for the first 5 days
            const halfROI = totalROI / 2;
            const profitsGeneratedInFirst5Days = allDailyProfits
              .filter((record) => {
                const recordDate = DateTime.fromISO(record.fields.date as string).setZone(
                  timezone as string
                );
                return recordDate.diff(investmentStartDate, "days").days < 5;
              })
              .reduce(
                (sum, record) =>
                  sum + parseFloat((record.fields.profit as string) || "0"),
                0
              );

            const remainingHalfROI = halfROI - profitsGeneratedInFirst5Days;

            if (daysElapsed < 4) {
              // Generate a random profit for the first 4 days
              dailyProfit = parseFloat(
                (
                  Math.random() *
                  (remainingHalfROI / (5 - (daysElapsed + 1))) *
                  1.5
                ).toFixed(2)
              );
            } else {
              // On the 5th day, assign all remaining half ROI
              dailyProfit = remainingHalfROI;
            }
          } else {
            // After the first 5 days, distribute the remaining half ROI
            dailyProfit =
              remainingDays === 1
                ? remainingProfit // Assign all remaining profit on the last day
                : parseFloat(
                    (
                      Math.random() *
                      ((remainingProfit / remainingDays) * 1.5)
                    ).toFixed(2)
                  );
          }

          // Save daily profit to Airtable
          await dailyProfits.create({
            investment_id: id,
            date: today as string,
            profit: dailyProfit,
          });

          console.log(
            `Generated daily profit of $${dailyProfit.toFixed(
              2
            )} for investment ID: ${id} on ${today}`
          );
        }
      } else {
        console.log(
          `Profit for ${today} already exists for investment ID: ${id}`
        );
      }
    }

    return Response.json(
      { message: "Generated daily profit for investments" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating daily profits:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
