import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../AuthContext'
import Home from '../Home'
import Login from '../Login'
import Signup from '../Signup'
import Logout from '../Logout'
import Protected from '../Protected'
import SetCookie from '../SetCookie'
import GetCookie from '../GetCookie'
import SetLocalStorage from '../SetLocalStorage'
import GetLocalStorage from '../GetLocalStorage'

vi.mock('axios', () => {
  const mock = vi.fn().mockResolvedValue({ data: {} })
  mock.get = vi.fn().mockResolvedValue({ data: {} })
  mock.post = vi.fn().mockResolvedValue({ data: {} })
  return { default: mock }
})

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/set-cookie" element={<SetCookie />} />
          <Route path="/get-cookie" element={<GetCookie />} />
          <Route path="/set-local-storage" element={<SetLocalStorage />} />
          <Route path="/get-local-storage" element={<GetLocalStorage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/protected" element={<Protected />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('front-end routes', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('renders Home at /', () => {
    renderRoute('/')
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
  })

  it('renders Login form at /login', () => {
    renderRoute('/login')
    expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
  })

  it('renders Signup form at /signup', () => {
    renderRoute('/signup')
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByDisplayValue('Create account')).toBeInTheDocument()
  })

  it('renders SetCookie page at /set-cookie', async () => {
    renderRoute('/set-cookie')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Set a Cookie/i })).toBeInTheDocument()
    })
  })

  it('renders GetCookie page at /get-cookie', async () => {
    renderRoute('/get-cookie')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Get a Cookie/i })).toBeInTheDocument()
    })
  })

  it('renders SetLocalStorage page at /set-local-storage', () => {
    renderRoute('/set-local-storage')
    expect(screen.getByRole('heading', { name: /Set LocalStorage Data/i })).toBeInTheDocument()
  })

  it('renders GetLocalStorage page at /get-local-storage', () => {
    renderRoute('/get-local-storage')
    expect(screen.getByRole('heading', { name: /Get LocalStorage Data/i })).toBeInTheDocument()
  })

  it('redirects /protected to /login when not authenticated', async () => {
    renderRoute('/protected')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument()
    })
  })

  it('redirects /logout to home', async () => {
    renderRoute('/logout')
    await waitFor(() => {
      expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
    })
  })
})
