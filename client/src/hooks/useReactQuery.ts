import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginRequest } from "../types/auth";
import Service from "../service";

export const useLoginMutation = () =>
    useMutation({
        mutationFn: (credentials: LoginRequest) => Service.login(credentials)
    })

export const useTokenCheckQuery = () =>
    useQuery({
        queryKey: ['token-check'],
        queryFn: () => Service.tokenCheck()
    })