'use client'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function TestPage() {
  const session = useSession()
  const supabase = useSupabaseClient()

  const [email, setEmail] = useState('')

  // Form fields
  const [jobTitle, setJobTitle] = useState('')
  const [skills, setSkills] = useState('')
  const [entry, setEntry] = useState('');

  const [experienceLevel, setExperienceLevel] = useState('Entry')
  const [location, setLocation] = useState('')

  const [status, setStatus] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      console.error(error.message)
    } else {
      alert('Check your email for the magic link.')
    }
  }

  // const handleSubmitJob = async () => {
  //   setStatus('Submitting to AI...')
  //   setAiResponse('')

  //   const res = await fetch('/api/submit-job', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       job_title: jobTitle,
  //       skills,
  //       experience_level: experienceLevel,
  //       location,
  //     }),
  //   })

  //   const result = await res.json()

  //   if (result.success) {
  //     setAiResponse(result.generated)
  //     setStatus('✅ AI result generated and saved.')
  //     setJobTitle('')
  //     setSkills('')
  //     setExperienceLevel('Entry')
  //     setLocation('')
  //   } else {
  //     setStatus(`❌ Error: ${result.message}`)
  //   }
  // }
const handleSubmitJob = async () => {
  setStatus('Submitting to AI...')
  setAiResponse('')

  const res = await fetch('/api/submit-job', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jobTitle,
      skills, // sending as 'entry'
      entry,
      location,
    }),
  })

  const result = await res.json();

if (result.success && result.generated) {
  setAiResponse(result.generated);
  setStatus('✅ AI result generated and saved.');
  setJobTitle('');
  setSkills('');
  setEntry('');
  setExperienceLevel('Entry');
  setLocation('');
} else if (result.success) {
  setStatus('✅ Job submitted, but no AI result returned.');
} else {
  setStatus(`❌ Error: ${result.error || result.message || 'Unknown error'}`);
}
}

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload() // Refresh to reflect logged-out state
  }

  if (session) {
    return (
      <div className="p-6 max-w-xl space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Welcome, {session.user.email}!
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 underline"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          value={jobTitle}
          onChange={e => setJobTitle(e.target.value)}
          placeholder="Job Title"
          className="border px-4 py-2 w-full"
        />

        <textarea
          value={skills}
          onChange={e => setSkills(e.target.value)}
          placeholder="Skills (e.g., React, Node.js, SQL)"
          className="border px-4 py-2 w-full"
          rows={3}
        />
        <label className="block text-sm font-medium mb-1">Entry (experience/goals)</label>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Tell us about your background, experience, or goals"
          className="border px-4 py-2 w-full rounded-lg shadow-sm"
          rows={4}
        />

        <select
          value={experienceLevel}
          onChange={e => setExperienceLevel(e.target.value)}
          className="border px-4 py-2 w-full"
        >
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="border px-4 py-2 w-full"
        />

        <button
          onClick={handleSubmitJob}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit to AI
        </button>

        {status && <p className="text-sm mt-2">{status}</p>}

        {aiResponse && (
          <div className="bg-gray-100 border p-4 mt-4 rounded text-sm whitespace-pre-wrap">
            {aiResponse}
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleLogin} className="p-6">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        className="border px-4 py-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Magic Link
      </button>
    </form>
  )
}



// // 'use client'

// // import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
// // import { useState } from 'react'

// // export default function TestPage() {
// //   const session = useSession()
// //   const supabase = useSupabaseClient()

// //   const [email, setEmail] = useState('')
// //   const [jobTitle, setJobTitle] = useState('')
// //   const [status, setStatus] = useState('')

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     const { error } = await supabase.auth.signInWithOtp({ email })
// //     if (error) {
// //       console.error(error.message)
// //     } else {
// //       alert('Check your email for the magic link.')
// //     }
// //   }
  
// //   const handleSaveJob = async () => {
// //     setStatus('Saving...')
// //     const res = await fetch('/api/save-to-supabase', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ job_title: jobTitle }),
// //     })

// //     const result = await res.json()
// //     if (result.success) {
// //       setStatus('✅ Job title saved successfully.')
// //       setJobTitle('')
// //     } else {
// //       setStatus(`❌ Error: ${result.message}`)
// //     }
// //   }

// //   if (session) {
// //     return (
// //       <div className="p-4 space-y-4">
// //         <h1 className="text-xl font-bold">Welcome, {session.user.email}!</h1>

// //         <input
// //           type="text"
// //           value={jobTitle}
// //           onChange={e => setJobTitle(e.target.value)}
// //           placeholder="Enter job title"
// //           className="border px-4 py-2 mr-2 w-full max-w-md"
// //         />
// //         <button
// //           onClick={handleSaveJob}
// //           className="bg-green-600 text-white px-4 py-2 rounded"
// //         >
// //           Save Job Title
// //         </button>

// //         {status && <p className="text-sm text-gray-700 mt-2">{status}</p>}
// //       </div>
// //     )
// //   }

// //   return (
// //     <form onSubmit={handleLogin} className="p-4">
// //       <input
// //         type="email"
// //         value={email}
// //         onChange={e => setEmail(e.target.value)}
// //         placeholder="Your email"
// //         className="border px-4 py-2 mr-2"
// //       />
// //       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
// //         Send Magic Link
// //       </button>
// //     </form>
// //   )
// // }

// // 'use client'

// // import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
// // import { useEffect, useState } from 'react'

// // export default function TestPage() {
// //   const session = useSession()
// //   const supabase = useSupabaseClient()

// //   const [email, setEmail] = useState('')
// //   const [jobTitle, setJobTitle] = useState('')
// //   const [status, setStatus] = useState('')
// //   const [loading, setLoading] = useState(false)

// //   // Insert user into `users` table after login
// //   useEffect(() => {
// //     const insertUser = async () => {
// //       if (session?.user) {
// //         const { id, email } = session.user
// //         const { error } = await supabase.from('users').upsert({
// //           id,
// //           email,
// //         })

// //         if (error) {
// //           console.error('Error inserting user:', error.message)
// //         } else {
// //           console.log('User inserted into users table.')
// //         }
// //       }
// //     }

// //     insertUser()
// //   }, [session, supabase])

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     const { error } = await supabase.auth.signInWithOtp({ email })
// //     setLoading(false)
// //     if (error) {
// //       console.error(error.message)
// //       setStatus(`❌ Login failed: ${error.message}`)
// //     } else {
// //       setStatus('✅ Magic link sent! Check your email.')
// //     }
// //   }

// //   const handleSaveJob = async () => {
// //     if (!jobTitle) return setStatus('❌ Please enter a job title.')
// //     setLoading(true)
// //     setStatus('Saving...')

// //     const res = await fetch('/api/save-to-supabase', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ job_title: jobTitle }),
// //     })

// //     const result = await res.json()
// //     setLoading(false)
// //     if (result.success) {
// //       setStatus('✅ Job title saved successfully.')
// //       setJobTitle('')
// //     } else {
// //       setStatus(`❌ Error: ${result.message}`)
// //     }
// //   }

// //   if (session) {
// //     return (
// //       <div className="p-4 space-y-4 max-w-xl">
// //         <h1 className="text-xl font-bold">Welcome, {session.user.email}!</h1>

// //         <input
// //           type="text"
// //           value={jobTitle}
// //           onChange={e => setJobTitle(e.target.value)}
// //           placeholder="Enter job title"
// //           className="border px-4 py-2 w-full"
// //         />
// //         <button
// //           onClick={handleSaveJob}
// //           disabled={loading}
// //           className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
// //         >
// //           {loading ? 'Saving...' : 'Save Job Title'}
// //         </button>

// //         {status && <p className="text-sm text-gray-700 mt-2">{status}</p>}
// //       </div>
// //     )
// //   }

// //   return (
// //     <form onSubmit={handleLogin} className="p-4 space-y-4 max-w-md">
// //       <input
// //         type="email"
// //         value={email}
// //         onChange={e => setEmail(e.target.value)}
// //         placeholder="Your email"
// //         className="border px-4 py-2 w-full"
// //       />
// //       <button
// //         type="submit"
// //         disabled={loading}
// //         className="bg-blue-500 text-white px-4 py-2 rounded w-full disabled:opacity-50"
// //       >
// //         {loading ? 'Sending...' : 'Send Magic Link'}
// //       </button>
// //       {status && <p className="text-sm text-gray-700">{status}</p>}
// //     </form>
// //   )
// // }


// 'use client'

// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
// import { useState } from 'react'

// export default function TestPage() {
//   const session = useSession()
//   const supabase = useSupabaseClient()

//   const [email, setEmail] = useState('')

//   // Form fields
//   const [jobTitle, setJobTitle] = useState('')
//   const [skills, setSkills] = useState('')
//   const [experienceLevel, setExperienceLevel] = useState('Entry')
//   const [location, setLocation] = useState('')

//   const [status, setStatus] = useState('')
//   const [aiResponse, setAiResponse] = useState('')

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const { error } = await supabase.auth.signInWithOtp({ email })
//     if (error) {
//       console.error(error.message)
//     } else {
//       alert('Check your email for the magic link.')
//     }
//   }

//   const handleSubmitJob = async () => {
//     setStatus('Submitting to AI...')
//     setAiResponse('')

//     const res = await fetch('/api/submit-job', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         job_title: jobTitle,
//         skills,
//         experience_level: experienceLevel,
//         location,
//       }),
//     })

//     const result = await res.json()

//     if (result.success) {
//       setAiResponse(result.generated)
//       setStatus('✅ AI result generated and saved.')
//       setJobTitle('')
//       setSkills('')
//       setExperienceLevel('Entry')
//       setLocation('')
//     } else {
//       setStatus(`❌ Error: ${result.message}`)
//     }
//   }

//   if (session) {
//     return (
//       <div className="p-6 max-w-xl space-y-4">
//         <h1 className="text-xl font-bold">Welcome, {session.user.email}!</h1>

//         <input
//           type="text"
//           value={jobTitle}
//           onChange={e => setJobTitle(e.target.value)}
//           placeholder="Job Title"
//           className="border px-4 py-2 w-full"
//         />

//         <textarea
//           value={skills}
//           onChange={e => setSkills(e.target.value)}
//           placeholder="Skills (e.g., React, Node.js, SQL)"
//           className="border px-4 py-2 w-full"
//           rows={3}
//         />

//         <select
//           value={experienceLevel}
//           onChange={e => setExperienceLevel(e.target.value)}
//           className="border px-4 py-2 w-full"
//         >
//           <option value="Entry">Entry</option>
//           <option value="Mid">Mid</option>
//           <option value="Senior">Senior</option>
//         </select>

//         <input
//           type="text"
//           value={location}
//           onChange={e => setLocation(e.target.value)}
//           placeholder="Location (optional)"
//           className="border px-4 py-2 w-full"
//         />

//         <button
//           onClick={handleSubmitJob}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Submit to AI
//         </button>

//         {status && <p className="text-sm mt-2">{status}</p>}

//         {aiResponse && (
//           <div className="bg-gray-100 border p-4 mt-4 rounded text-sm whitespace-pre-wrap">
//             {aiResponse}
//           </div>
//         )}
//       </div>
//     )
//   }

//   return (
//     <form onSubmit={handleLogin} className="p-6">
//       <input
//         type="email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Your email"
//         className="border px-4 py-2 mr-2"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Send Magic Link
//       </button>
//     </form>
//   )
// }
