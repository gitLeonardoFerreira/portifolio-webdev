import AuthProvider from './AuthProvider.jsx'
export default function AuthBoundary({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}
