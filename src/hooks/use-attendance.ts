"use client"

import { useState } from "react"
import { toast } from "sonner"

type UserData = {
    email: string
    name: string
    picture: string
}

type QueryParameter = {
    course: string
    session: string
}

type LocationData = {
    latitude: number
    longitude: number
}

type AttendanceStatus = "idle" | "loading" | "success" | "error"

const url = import.meta.env.PUBLIC_BACK_END_URL! as string;
const key = import.meta.env.PUBLIC_BACK_END_KEY! as string;

export function useAttendance() {
    const [ status, setStatus ] = useState<AttendanceStatus>("idle")

    const markAttendance = async (user: UserData, parameter: QueryParameter, location: LocationData) => {
        if (!user || !parameter || !location) return

        setStatus("loading")

        try {
            const response = await fetch(`${ url }/attendance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Internal-Secret": key,
                },
                body: JSON.stringify({
                    course_id: parameter.course,
                    session_id: parameter.session,
                    student_email: user.email,
                    student_latitude: location.latitude,
                    student_longitude: location.longitude,
                }),
            })

            const status = response.status;

            switch (status) {
                case 400:
                    setStatus("error")
                    toast.error("No se pudo registrar la asistencia.", {
                        description: "Tu correo electrónico no es de UTEC."
                    })
                    break;
                case 401:
                    setStatus("error")
                    toast.error("No se pudo registrar la asistencia.", {
                        description: "Sesión no encontrada."
                    })
                    break;
                case 402:
                    setStatus("success")
                    toast.error("No se pudo registrar la asistencia.", {
                        description: "Asistencia ya registrada."
                    })
                    break;
                case 403:
                    setStatus("error")
                    toast.error("No se pudo registrar la asistencia.", {
                        description: "Sesión expirada."
                    })
                    break;
                case 404:
                    setStatus("error")
                    toast.error("No se pudo registrar la asistencia.", {
                        description: "No estás en UTEC."
                    })
                    break;

                case 200:
                    setStatus("success")
                    toast.success("Asistencia registrada con éxito.")
                    break;
                default:
                    break;

            }
        } catch (error) {
            setStatus("error")
            console.log(error)
            toast.error("No se pudo registrar la asistencia.")
        }
    }

    const resetStatus = () => {
        setStatus("idle")
    }

    return { status, markAttendance, resetStatus }
}

