import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "./axios";

// get classes
export const useGetProfile = () => {
    return useQuery({
        queryKey: ['getProfile'],
        queryFn: async () => {
            return await apiService.get(`/user/get-profile`);
        },
        retry: 0,
    });
};

// get attendance
export const useGetAttendance = (startDate, endDate) => {
    return useQuery({
        queryKey: ['getAttendance', startDate, endDate],
        queryFn: async () => {
            return await apiService.get(`/user/get-attendance?startDate=${startDate}&endDate=${endDate}`);
        },
        retry: 0,
    });
};

// get classes
export const useGetClasses = () => {
    return useQuery({
        queryKey: ['getClasses'],
        queryFn: async () => {
            return await apiService.get(`/user/get-classData`);
        },
        retry: 0,
    });
};

// get reports
export const useGetReports = ({page,limit,startDate,endDate}) => {
    return useQuery({
        queryKey: ['getReports', page, limit, startDate, endDate],
        queryFn: async () => {
            return await apiService.get(`/user/get-reports?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`);
        },
        retry: 0,
    });
};

  

// get toppers
export const useGetToppers = () => {
    return useQuery({
        queryKey: ['getToppers'],
        queryFn: async () => {
            return await apiService.get(`/user/get-toppers`);
        },
        retry: 0,
    });
};