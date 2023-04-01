import { supabase } from '../utils/supabaseClient';
import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function Avatar({ uid, url, size, onUpload, data }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  // useEffect(() => {
  //   if (url) downloadImage(url)
  // }, [url])

  // async function downloadImage(path) {
  //   try {
  //     const { data, error } = await supabase.storage.from('avatars').download(path)
  //     if (error) {
  //       throw error
  //     }
  //     const url = URL.createObjectURL(data)
  //     setAvatarUrl(url)
  //   } catch (error) {
  //     console.log('Error downloading image: ', error)
  //   }
  // }

  const uploadAvatar = async (event) => {
		console.log(event.target.value)
    try {
      setUploading(true)

      if (!event.target.value) {
        throw new Error("Sorry, there appears to be a problem with that selection.")
      }

      // const file = event.target.files[0]
      // const fileExt = file.name.split('.').pop()
      // const fileName = `${uid}.${fileExt}`
      const filePath = `${event.target.value}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {url ? (
        <img
          src={url}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
				<select onChange={uploadAvatar}></select>
      </div>
    </div>
  )
}

export default Avatar;
