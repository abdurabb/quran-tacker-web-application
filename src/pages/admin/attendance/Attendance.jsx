import React, { useState, useEffect } from 'react';
import { useGetAttendance, useGetAllClasses, } from '../../../apis/useAdminDataController';
import AttendanceCom from '../../../components/attendance/AttendanceCom';

function Attendance() {
  const [classId, setClassId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  // APIs
  const { data: classesData, isLoading: classesLoading, isSuccess: isClassesSuccess } = useGetAllClasses(search);

  useEffect(() => {
    if (isClassesSuccess && classesData?.classes?.length > 0 && !classId) {
      setClassId(classesData.classes[0]._id);
    }
  }, [isClassesSuccess, classesData, classId]);


  const { data: attendanceData, isLoading: attendanceLoading } =
    useGetAttendance({
      classId,
      date: selectedDate,
      page,
      limit,
    });

  useEffect(() => {
    if (isClassesSuccess && classesData?.classes?.length > 0) {
      setClassId(prev => prev ?? classesData.classes[0]._id);
    }
  }, [isClassesSuccess, classesData]);

  const classes = classesData?.classes || [];
  const attendanceRecords = attendanceData?.attendance || [];
  const totalPages = attendanceData?.totalPages || 0;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [classId, selectedDate]);
  return (
    <AttendanceCom
      classes={classes}
      attendanceRecords={attendanceRecords}
      totalPages={totalPages}
      classesLoading={classesLoading}
      setClassId={setClassId}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      page={page}
      setPage={setPage}
      attendanceLoading={attendanceLoading}
      classId={classId}
      type={"admin"}
    />
  )
}

export default Attendance