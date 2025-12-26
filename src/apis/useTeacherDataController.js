import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "./axios";



// get classes
export const useGetClasses = (classId, page, limit, search) => {
    return useQuery({
        queryKey: ['getClasses'],
        queryFn: async () => {
            return await apiService.get(`/teacher/get-classes`);
        },
        retry: 0,
    });
};

// get students
export const useGetStudents = (classId, page, limit, search) => {
    return useQuery({
        queryKey: ['getStudents', classId, page, limit, search],
        queryFn: async () => {
            return await apiService.get(`/teacher/get-students?classId=${classId}&page=${page}&limit=${limit}&search=${search || ''}`);
        },
        retry: 0,
    });
};

// get student details
export const useGetStudentDetails = (studentId) => {
    return useQuery({
        queryKey: ['getStudentDetails', studentId],
        queryFn: async () => {
            return await apiService.get(`/teacher/get-student-details?studentId=${studentId}`);
        },
        retry: 0,
    });
};


// get lessons and marks
export const useGetLessonsAndMarks = () => {
    return useQuery({
        queryKey: ['getLessonsAndMarks'],
        queryFn: async () => {
            return await apiService.get(`/teacher/get-lessons-and-marks`);
        },
        retry: 0,
    });
};

// add mark for student
export const useAddMark = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            return await apiService.post(`/teacher/add-mark`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getStudentDetails'] });
            queryClient.invalidateQueries({ queryKey: ['getLessonsAndMarks'] });
            queryClient.invalidateQueries({ queryKey: ['getDailyReports'] });
            queryClient.invalidateQueries({ queryKey: ['getStudentReportDetails'] });
            queryClient.invalidateQueries({ queryKey: ['getDashboardData'] });
        },
    });
};

// get daily reports
export const useGetDailyReports = (startDate, endDate, classId, page, limit, search, sort) => {
    return useQuery({
        queryKey: ['getDailyReports', startDate, endDate, classId, page, limit, search, sort],
        queryFn: async () => {
            let url = `/teacher/get-daily-reports`;
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (classId) params.append('classId', classId);
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if (search) params.append('search', search);
            console.log(sort);
            if (sort !== undefined && sort !== null && sort !== '' && sort !== 1) params.append('sortByLow', true);
            if (params.toString()) url += `?${params.toString()}`;
            return await apiService.get(url);
        },
        retry: 0,
    });
};

// get student report details
export const useGetStudentReportDetails = (studentId, startDate, endDate, page, limit) => {
    return useQuery({
        queryKey: ['getStudentReportDetails', studentId, startDate, endDate, page, limit],
        queryFn: async () => {
            let url = `/teacher/get-student-report-details?studentId=${studentId}`;
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);
            if (params.toString()) url += `&${params.toString()}`;
            return await apiService.get(url);
        },
        retry: 0,
        enabled: !!studentId,
    });
};

// get-top-students
export const useGetTopStudents = (startDate, endDate, count) => {
    return useQuery({
        queryKey: ['getTopStudents', startDate, endDate, count],
        queryFn: async () => {
            return await apiService.get(`/teacher/get-top-students?startDate=${startDate}&endDate=${endDate}&count=${count}`);
        },
        retry: 0,
    });
};

// update report/mark
export const useUpdateReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            return await apiService.put(`/teacher/update-report`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getStudentReportDetails'] });
            queryClient.invalidateQueries({ queryKey: ['getDailyReports'] });
            queryClient.invalidateQueries({ queryKey: ['getTopStudents'] });
            queryClient.invalidateQueries({ queryKey: ['getDashboardData'] });
        },
    });
};

// delete report/mark
export const useDeleteReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (reportId) => {
            return await apiService.delete(`/teacher/delete-report?reportId=${reportId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getStudentReportDetails'] });
            queryClient.invalidateQueries({ queryKey: ['getDailyReports'] });
            queryClient.invalidateQueries({ queryKey: ['getTopStudents'] });
            queryClient.invalidateQueries({ queryKey: ['getDashboardData'] });
        },
    });
};

// get dashboard data
export const useGetDashboardData = () => {
    return useQuery({
        queryKey: ['getDashboardData'],
        queryFn: async () => {
            return await apiService.get(`/teacher/get-dashboard-data`);
        },
        retry: 0,
    });
};

// get attendance
export const useGetAttendance = ({ classId, date, page, limit }) => {
    return useQuery({
        queryKey: ['getAttendance', classId, date, page, limit],
        enabled: !!classId, 
        queryFn: async () => {
            let url = `/teacher/get-attendance`;
            const params = new URLSearchParams();

            params.append('classId', classId); // safe now
            if (date) params.append('date', date);
            if (page) params.append('page', page);
            if (limit) params.append('limit', limit);

            url += `?${params.toString()}`;
            return await apiService.get(url);
        },
        retry: 0,
    });
};


// add attendance
export const useAddAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            return await apiService.post(`/teacher/add-attendance`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAttendance'] });
        },
    });
};

// update attendance
export const useUpdateAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            return await apiService.put(`/teacher/update-attendance`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAttendance'] });
        },
    });
};