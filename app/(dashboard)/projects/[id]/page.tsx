import React from 'react';
import { useRouter } from 'next/router';

const ProjectPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Project Details for {id}</h1>
            {/* Additional project details and components can be added here */}
        </div>
    );
};

export default ProjectPage;