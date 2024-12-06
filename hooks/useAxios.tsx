"use client";

import axios from "axios";
import { APi } from "./useEnv";
import { useContext, useMemo } from "react";
import { Context } from "@/context/FilterContext";

export const useAxios = () => {

    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(Context);

    const api = useMemo(() => {
        const instance = axios.create({
            baseURL: "http://3.125.43.204:7777/v1",
        });

        // Attach Authorization header
        if (accessToken) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }

        // Request interceptor
        instance.interceptors.request.use(
            (config) => config,
            (error) => Promise.reject(error)
        );

        // Response interceptor for token refresh
        instance.interceptors.response.use(
            (response) => response, // Pass through successful responses
            async (error) => {
                if (error.response?.status === 401 && refreshToken) {
                    try {
                        const response = await instance.get(`/token/${refreshToken}`);

                        const newAccessToken = response.data.access_token;
                        setAccessToken(newAccessToken);
                        setRefreshToken(response.data.refresh_token);

                        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return instance(error.config);
                    } catch (refreshError) {
                        console.error('Failed to refresh token:', refreshError);
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return instance;
    }, [accessToken, refreshToken, setAccessToken]);

    return api;
};
