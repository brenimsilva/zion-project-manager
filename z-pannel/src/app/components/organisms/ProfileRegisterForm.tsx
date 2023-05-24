"use client"
import React, { useState } from 'react'
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IDMProfile } from '@/app/services/datamatrix/profiles/Interfaces';
import FormInput from '@/app/components/atoms/FormInput';
import ProfileService from '@/app/services/datamatrix/profiles/ProfileService';



const registerSchema = z.object({
username: z.string(),
discord_username: z.string(),
discord_id: z.string(),
discord_email: z.string(),
})

type RegisterSchema = z.infer<typeof registerSchema>
export default function ProfileRegisterForm() {
    const [message, setMessage] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
      });
    
      async function submitNewProfile(profile: RegisterSchema) {
        const response = await ProfileService.add({...profile, id_user: 1, discord_api_token: "", discord_avatar: ""});
        setMessage(JSON.stringify(response));
        return;
      }
    
    
      return (
        <div>
          <form onSubmit={handleSubmit(submitNewProfile)}>
            <FormInput getInput={{...register("username")}} inputType='text' text='Username'/>
            <FormInput getInput={{...register("discord_username")}} inputType='text' text='Discord Username'/>
            <FormInput getInput={{...register("discord_email")}} inputType='text' text='Discord Email'/>
            <FormInput getInput={{...register("discord_id")}} inputType='text' text='Discord Id'/>
            <button type='submit' className='p-5 border shadow'>Confirmar</button>
          </form>
          <strong className='text-cHL2'>{message}</strong>
        </div>
      )
}
