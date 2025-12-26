import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetStudentReportDetails } from '../../../apis/useAdminDataController';
import StudentReport from '../../../components/report/StudentReport';

function ReportDetails() {
    const [searchParams] = useSearchParams();
    const studentId = searchParams.get('studentId');

    // Date range state - get from URL params if available
    const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
    const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    // APIs
    const { data, isLoading } = useGetStudentReportDetails(studentId, startDate, endDate, page, limit);

    const student = data?.student || {};
    const reports = data?.reports || [];
    const totalPages = data?.totalPages || 0;

    // Reset page when date filters change
    useEffect(() => {
        setPage(1);
    }, [startDate, endDate]);
    return (
        <StudentReport
            isLoading={isLoading}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            page={page}
            setPage={setPage}
            student={student}
            reports={reports}
            totalPages={totalPages}
            type={"admin"}
        />
    )
}

export default ReportDetails