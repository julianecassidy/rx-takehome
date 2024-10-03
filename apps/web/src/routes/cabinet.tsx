import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cabinet')({
  component: () => <div>Hello /cabinet!</div>
})