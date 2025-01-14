import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import WithdrawalForm from './WithdrawalForm'

export default function WithdrawalPage() {
  return (
    <div className="container px-4 max-w-md lg:pl-12 lg:px-0 py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Withdraw Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <WithdrawalForm />
        </CardContent>
      </Card>
    </div>
  )
}

