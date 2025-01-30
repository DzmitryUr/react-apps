import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: ContactComponent,
});

function ContactComponent() {
  return <div>Hello "/contact"!</div>;
}
