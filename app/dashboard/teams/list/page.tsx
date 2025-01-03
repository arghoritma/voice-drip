  "use client"
  import React, { useEffect, useState } from 'react'
  import { Building2, Users, Plus, Pencil, Trash2 } from 'lucide-react'

  interface Team {
    id: number
    name: string
    description: string
  }

  export default function Page() {
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchTeams = async () => {
        try {
          const response = await fetch('/api/teams')
          const data = await response.json()
          setTeams(data)
        } catch (error) {
          console.error('Error fetching teams:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchTeams()
    }, [])

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600">
                  Daftar Perusahaan
                </h1>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all duration-300">
                <Plus className="w-5 h-5" />
                <span>Tambah Perusahaan</span>
              </button>
            </div>
          </div>

          {/* Teams Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                    <div className="flex justify-between items-start">
                      <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
                          <Pencil className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {team.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {team.description}
                    </p>
                    <div className="flex items-center text-blue-600">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">12 Anggota</span>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-50 border-t border-blue-100">
                    <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && teams.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-blue-200">
              <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum ada perusahaan</h3>
              <p className="text-gray-600 mb-6">Mulai dengan menambahkan perusahaan baru</p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all duration-300 mx-auto">
                <Plus className="w-5 h-5" />
                <span>Tambah Perusahaan</span>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
