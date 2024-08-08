"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import Image from "next/image"
import { SelectItem } from "../ui/select"
import { FileUpload } from "../FileUpload"

const RegisterForm = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
        setIsLoading(true)

        let formData;

        if (values.identificationDocument && values.identificationDocument?.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            })

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name)
        }
        try {
            const patientData = {
                userId: user.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                birthDate: new Date(values.birthDate),
                gender: values.gender,
                address: values.address,
                occupation: values.occupation,
                emergencyContactName: values.emergencyContactName,
                emergencyContactNumber: values.emergencyContactNumber,
                primaryPhysician: values.primaryPhysician,
                insuranceProvider: values.insuranceProvider,
                insurancePolicyNumber: values.insurancePolicyNumber,
                allergies: values.allergies,
                currentMedication: values.currentMedication,
                familyMedicalHistory: values.familyMedicalHistory,
                pastMedicalHistory: values.pastMedicalHistory,
                identificationType: values.identificationType,
                identificationNumber: values.identificationNumber,
                identificationDocument: values.identificationDocument
                    ? formData
                    : undefined,
                privacyConsent: values.privacyConsent,
                treatmentConsent: values.treatmentConsent,
                disclosureConsent: values.disclosureConsent
            }

            const patient = await registerPatient(patientData);

            if (patient) router.push(`/patients/${user.$id}/new-appointment`)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let&apos;s get to know you better.</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="name"
                    label="Full name"
                    placeholder="ex: Investor Sabinus"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="User"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="email"
                        label="Email address"
                        placeholder="investor@sabinus.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="Email"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                        name="phone"
                        label="Phone number"
                        placeholder="+234 012 345 6789"
                        iconSrc="/assets/icons/phone.svg"
                        iconAlt="Phone"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name="birthDate"
                        label="Date of Birth"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.SKELETON}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option}
                                                className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="address"
                        label="Address"
                        placeholder="1st Street, Pineapple Island"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="occupation"
                        label="Occupation"
                        placeholder="Angel Investor"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="emergencyContactName"
                        label="Emergency contact name"
                        placeholder="Guardian's Name"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                        name="emergencyContactNumber"
                        label="Emergency contact number"
                        placeholder="+234 012 345 6789"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SELECT}
                    name="primaryPhysician"
                    label="Primary Physician"
                    placeholder="Select a physician"
                >
                    {Doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    width={32}
                                    height={32}
                                    alt={doctor.name}
                                    className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="insuranceProvider"
                        label="Insurance provider"
                        placeholder="Layi Wasabi Insured"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="insurancePolicyNumber"
                        label="Insurance Policy number"
                        placeholder="ABC123456789"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Glutten, Insulin, Penicillin"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="currentMedication"
                        label="Current medication (if any)"
                        placeholder="Aderall 5mg, Tramadol 25mg"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="familyMedicalHistory"
                        label="Family medical history"
                        placeholder="Grandma had alien hand syndrome, Uncle had imposter syndrome"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="pastMedicalHistory"
                        label="Past medical history"
                        placeholder="Carotid endarterectomy, Tonsillectomy"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification and Verification</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SELECT}
                    name="identificationType"
                    label="Identification type"
                    placeholder="Select an identification type"
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="identificationNumber"
                    label="Identification number"
                    placeholder="123456789"
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    name="identificationDocument"
                    label="Identification document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUpload
                                files={field.value}
                                onChange={field.onChange}
                            />
                        </FormControl>
                    )}
                />

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name="treatmentConsent"
                    label="I consent to receive medical treatment from appointed doctor."
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name="disclosureConsent"
                    label="I consent to the disclosure of my medical information for healthcare purposes."
                />

                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.CHECKBOX}
                    name="privacyConsent"
                    label="I hereby confirm that I have carefully reviewed and accepted DocThud's privacy policy."
                />

                <SubmitButton
                    isLoading={isLoading}
                >
                    Get Started
                </SubmitButton>
            </form>
        </Form>
    )
}


export default RegisterForm