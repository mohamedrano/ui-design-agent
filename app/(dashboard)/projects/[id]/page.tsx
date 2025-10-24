'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const ProjectPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  return (
    <div>
      <h1>Project Details for {id}</h1>
    </div>
  );
};

export default ProjectPage;
