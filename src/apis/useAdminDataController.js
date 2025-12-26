import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "./axios";
import { uploadFile } from "./cloudinary";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { finishImageUpload, startImageUpload } from "../redux/rootReducer";


// login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/login`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

// classes
export const useGetClasses = (page, limit, search) => {
  return useQuery({
    queryKey: ['getClasses', page, limit, search],

    queryFn: async () => {
      return await apiService.get(`/admin/get-classes?page=${page}&limit=${limit}&search=${search}`);
    },
    retry: 0,
  })
}

export const useGetAllClasses = (search, enabled = true) => {
  return useQuery({
    queryKey: ['getAllClasses', search],
    queryFn: async () => {
      return await apiService.get(`/admin/get-all-classes?search=${search}`);
    },
    enabled: enabled,
    retry: 0,
  })
}


export const useAddClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/add-class`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/update-class`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/delete-class`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useAssignTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      console.log(payload)
      const response = await apiService.post(
        `/admin/assign-a-teacher`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useRemoveTeacherFromClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/remove-teacher`,
        payload
      );
      return response;

    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};



// teachers
export const useGetTeachers = (page, limit, search) => {
  return useQuery({
    queryKey: ['getTeachers', page, limit, search],

    queryFn: async () => {
      return await apiService.get(`/admin/get-teachers?page=${page}&limit=${limit}&search=${search}`);
    },
    retry: 0,
  })
}

export const useGetAllTeachers = (search) => {
  return useQuery({
    queryKey: ['getAllTeachers', search],

    queryFn: async () => {
      return await apiService.get(`/admin/get-all-teachers?search=${search}`);
    },
    retry: 0,
  })
}

export const useGetTeacherDetails = (_id) => {
  return useQuery({
    queryKey: ['getTeacherDetails', _id],

    queryFn: async () => {
      return await apiService.get(`/admin/get-teacher-details?_id=${_id}`);
    },
    retry: 0,
  })
}

export const useAddTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/add-teacher`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/update-teacher`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/delete-teachers`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useAssignClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      console.log(payload)
      const response = await apiService.post(
        `/admin/assign-a-class`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

// students
export const useAddStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/add-student`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useGetStudents = (page, limit, search, classId = null) => {
  let query = {
    page: page,
    limit: limit,
    search: search,
  }
  if (classId) {
    query.classId = classId;
  }
  return useQuery({
    queryKey: ['getStudents', page, limit, search, classId],
    queryFn: async () => {
      return await apiService.get(`/admin/get-students?${new URLSearchParams(query).toString()}`);
    },
    retry: 0,
  })
}

export const useGetStudentsFilteredByClass = (search, page, limit, classId, isClass = false) => {
  return useQuery({
    queryKey: ['getStudentsFilteredByClass', search, page, limit, classId, isClass],
    queryFn: async () => {
      return await apiService.get(`/admin/get-students-filtered-by-class?search=${search}&classId=${classId}&isClass=${isClass}&page=${page}&limit=${limit}`);
    },
    retry: 0,
  })
}

export const useGetStudentDetails = (_id) => {
  return useQuery({
    queryKey: ['getStudentDetails', _id],

    queryFn: async () => {
      return await apiService.get(`/admin/get-student-details?_id=${_id}`);
    },
    retry: 0,
  })
}

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/delete-students`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};


export const useAssignClassForStudents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/assign-a-class-for-student`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};


// lessons
export const useGetLessons = (page, limit, search) => {
  return useQuery({
    queryKey: ['getLessons', page, limit, search],

    queryFn: async () => {
      return await apiService.get(`/admin/get-lessons?page=${page}&limit=${limit}&search=${search}`);
    },
    retry: 0,
  })
}

export const useAddLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/add-lesson`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/update-lesson`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/delete-lesson`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("");
    },
    retry: 0,
  });
};

// lesson types
export const useGetLessonTypes = () => {
  return useQuery({
    queryKey: ['getLessonTypes'],
    queryFn: async () => {
      return await apiService.get(`/admin/get-lesson-types`);
    },
    retry: 0,
  })
}

export const useAddLessonType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await apiService.post(`/admin/add-lesson-type`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getLessonTypes']);
    },
    retry: 0,
  })
}


export const useUpdateLessonType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await apiService.post(`/admin/update-lesson-type`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getLessonTypes']);
    },
    retry: 0,
  })
}

export const useDeleteLessonType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return await apiService.post(`/admin/delete-lesson-type`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getLessonTypes']);
    },
    retry: 0,
  })
}

// image uploading
export const useImageUpload = () => {
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (payload) => {
      dispatch(startImageUpload()); // start count

      try {
        const response = await uploadFile(payload, (progress) => {
          setUploadProgress(progress);
        });
        return response;
      } finally {
        dispatch(finishImageUpload()); // always decrease count
      }
    },

    onError: (error) => {
      console.error("Upload failed:", error);
      console.log(error, '///////////');

      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return
      }
      toast.error("Upload failed. Please try again.");
    },

    retry: 0,
  });

  return {
    ...mutation,
    uploadProgress,
    resetProgress: () => setUploadProgress(0),
  };
};


// reports
export const useGetDailyReports = (startDate, endDate, classId, page, limit, search, sort) => {
  return useQuery({
    queryKey: ['getDailyReports', startDate, endDate, classId, page, limit, search, sort],
    queryFn: async () => {
      let url = `/admin/get-daily-reports`;
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (classId) params.append('classId', classId);
      if (page) params.append('page', page);
      if (limit) params.append('limit', limit);
      if (search) params.append('search', search);
      if (sort !== undefined && sort !== null && sort !== '' && sort !== 1) params.append('sortByLow', true);
      if (params.toString()) url += `?${params.toString()}`;
      return await apiService.get(url);
    },
    retry: 0,
  });
};

export const useGetTopStudents = (startDate, endDate, count) => {
  return useQuery({
    queryKey: ['getTopStudents', startDate, endDate, count],
    queryFn: async () => {
      return await apiService.get(`/admin/get-top-students?startDate=${startDate}&endDate=${endDate}&count=${count}`);
    },
    retry: 0,
  });
};

// get student report details
export const useGetStudentReportDetails = (studentId, startDate, endDate, page, limit) => {
  return useQuery({
    queryKey: ['getStudentReportDetails', studentId, startDate, endDate, page, limit],
    queryFn: async () => {
      let url = `/admin/get-student-report-details?studentId=${studentId}`;
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

// attendance
export const useGetAttendance = ({ classId, date, page, limit }) => {
  return useQuery({
    queryKey: ['getAttendance', classId, date, page, limit],
    enabled: !!classId,
    queryFn: async () => {
      let url = `/admin/get-attendance`;
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


// attendance
export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ['getDashboardData',],
    queryFn: async () => {
      let url = `/admin/get-dashboard-data`;
      // const params = new URLSearchParams();
      // url += `?${params.toString()}`;
      return await apiService.get(url);
    },
    retry: 0,
  });
};
