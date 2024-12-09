import { IoMdLogOut } from 'react-icons/io';
import { signOut } from '../../../../auth';

async function Logout(){
   
    return (
        <div>
            <form
                action={async () => {
                    "use server"
                    await signOut({redirectTo: '/login', redirect: true});
                }}
            >
                <button type="submit">
                    <IoMdLogOut className='cursor-pointer' size={35} color='white' />
                </button>
            </form>
        </div>
    )
}

export default Logout