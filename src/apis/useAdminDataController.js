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

export const useGetAllClasses = (search) => {
  return useQuery({
    queryKey: ['getAllClasses', search],

    queryFn: async () => {
      return await apiService.get(`/admin/get-all-classes?search=${search}`);
    },
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

export const useGetStudents = (page, limit, search) => {
  return useQuery({
    queryKey: ['getStudents', page, limit, search],

    queryFn: async () => {
      return await apiService.get(`/admin/get-students?page=${page}&limit=${limit}&search=${search}`);
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
