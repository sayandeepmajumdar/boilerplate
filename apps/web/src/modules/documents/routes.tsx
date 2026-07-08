import type { RouteObject } from 'react-router-dom';
import { DocumentsPage } from './pages/DocumentsPage';
import { moduleConfig } from './module.config';

const routes: RouteObject[] = [
  { index: true, element: <DocumentsPage /> },
  { path: ':spaceKey', element: <DocumentsPage /> },
  { path: ':spaceKey/:pageSlug', element: <DocumentsPage /> },
];

export { moduleConfig };
export default routes;
