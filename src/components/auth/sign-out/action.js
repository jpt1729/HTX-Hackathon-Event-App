"use client";
import { signOut } from "@/auth"

export async function signOutAction(){
    await signOut()
}