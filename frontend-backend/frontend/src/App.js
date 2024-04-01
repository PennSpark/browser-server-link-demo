import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


console.log(process.env.REACT_APP_MY_SUPABASE_URL);
const supabase = createClient(process.env.REACT_APP_MY_SUPABASE_URL, process.env.REACT_APP_MY_SUPABASE_KEY)

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  console.log(session);

  if (!session) {
    return (
      <div style={{ maxWidth: '400px', margin: "30px  " }}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    )
  }
  else {
    return (
      <div className="App">
        HI! You are logged in! Your user ID is {session.user.id}. I can now send this to the backend to do user logic.
        <button onClick={async (e) => {
          supabase.auth.signOut()
        }}>
          SIGN OUT
        </button>
      </div>
    )
  }
}