import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects')({
  component: ProjectsComponent,
});

function ProjectsComponent() {
  return <div>Hello "/projects"!</div>;
}
