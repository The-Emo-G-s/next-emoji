import { supabase } from '../lib/supabaseClient';
import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function Avatar({ uid, url, size, onUpload, animojis }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uid}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

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
      {avatarUrl ? (
        <img
          src={avatarUrl}
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
				<select
				defaultValue='Which emoji are you?'
			>
				{/* {animojis.sort((a,b) => a.name.localeCompare(b.name)).map((emoji) => {
					return (
						<option key={`memoji-${emoji.name}`} value={emoji.id}>
							<img className='mini-img' src={emoji.imageUrl} alt={emoji.name} />
						</option>
					)
				})} */}
				<option>🐻</option>
				<option>🐻</option>
				<option>🐻</option>
				<option>🐻</option>
				<option>🐻</option>
			</select>
        {/* <select
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        /> */}
      </div>
    </div>
  )
}
export async function getServerSideProps() {
  let { data } = await supabase.from('emotes').select()

  return {
    props: {
     animojis: data
    },
  }
}

export default Avatar;