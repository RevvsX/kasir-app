import EditProfile from '@/components/pages/profile/EditProfile'
import AppLayout from '@/layout/AppLayout'




const Profile = () => {
    
    return (
        <AppLayout>
            <div className="flex gap-2">
                <EditProfile/>
            </div>
        </AppLayout>
    )
}

export default Profile