import { useState, useEffect } from 'react'
import {
  collection,
  query,
  onSnapshot,
  FirestoreError,
} from 'firebase/firestore'

import db from '../firebase/store'
import { CollectionNameType } from '@types'

export default function useFetchCollection<T extends { id: string }>(
  name: CollectionNameType
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<FirestoreError | null>(null)

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, name))
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const results: T[] = []
        querySnapshot.forEach((doc) => {
          const result = { ...doc.data(), id: doc.id } as T
          results.push(result)
        })
        setData(results)
        setLoading(false)
      },
      (error) => {
        setError(error)
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [name])

  return { data, loading, error }
}
