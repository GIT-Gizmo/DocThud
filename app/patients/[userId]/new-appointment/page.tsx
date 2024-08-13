import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
    const patient = await getPatient(userId);

    if (!patient) {
        // Handle the case where the patient is not found
        return (
            <main className="flex h-screen max-h-screen">
                <section className="remove-scrollbar container">
                    <div className="sub-container max-w-[860px] flex-1 justify-between">
                        <Image
                            src="/assets/icons/logo-full.svg"
                            height={1000}
                            width={1000}
                            alt="Logo Image"
                            className="h-10 w-fit"
                        />

                        <div>
                            <p>Patient not found. Please try again.</p>
                        </div>

                        <p className="copyright mt-10 py-12">© 2024 DocThud</p>
                    </div>
                </section>

                <Image
                    src="/assets/images/appointment-img.png"
                    width={1000}
                    height={1000}
                    alt="appointment"
                    className="side-img max-w-[390px] bg-bottom"
                />
            </main>
        );
    }

    return (
        <main className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="Logo Image"
                        className="h-10 w-fit mb-12"
                    />

                    <AppointmentForm
                        type="create"
                        userId={userId}
                        patientId={patient.$id}
                    />

                    <p className="copyright mt-10 py-12">© 2024 DocThud</p>
                </div>
            </section>

            <Image
                src="/assets/images/appointment-img.png"
                width={1000}
                height={1000}
                alt="appointment"
                className="side-img max-w-[390px] bg-bottom"
            />
        </main>
    );
};

export default NewAppointment;
