import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleLogin } from "@react-oauth/google"

interface PreUserViewData {
    onSuccess: (response: any) => void
    onError: () => void
}

export function PreUserView({ onSuccess, onError }: PreUserViewData) {
    return (
        <Card className="w-full max-w-[350px] shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-xl sm:text-2xl">Attendance</CardTitle>
                <CardDescription>Inicia sesión con tu cuenta de Google de UTEC.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="w-full flex justify-center my-4">
                    <GoogleLogin
                        onSuccess={ onSuccess }
                        onError={ onError }
                        theme="outline"
                        size="large"
                        text="signin_with"
                        shape="rectangular"
                    />
                </div>
            </CardContent>
        </Card>
    )
}