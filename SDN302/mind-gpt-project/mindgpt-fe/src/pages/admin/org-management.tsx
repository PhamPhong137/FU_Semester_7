import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

const initialOrgs = [
  { id: 1, name: 'Tech Innovators', members: 50, mindMaps: 120, status: 'active' },
  { id: 2, name: 'Creative Solutions', members: 30, mindMaps: 80, status: 'active' },
  { id: 3, name: 'Global Enterprises', members: 100, mindMaps: 250, status: 'banned' },
  { id: 4, name: 'Startup Hub', members: 20, mindMaps: 40, status: 'active' },
  { id: 5, name: 'Education First', members: 75, mindMaps: 180, status: 'banned' },
  { id: 6, name: 'Health Innovations', members: 60, mindMaps: 150, status: 'active' },
  { id: 7, name: 'Green Solutions', members: 40, mindMaps: 100, status: 'active' },
  { id: 8, name: 'Financial Experts', members: 55, mindMaps: 130, status: 'banned' },
]

export function OrgManagement() {
  const [orgs, setOrgs] = useState(initialOrgs)
  const [filteredOrgs, setFilteredOrgs] = useState(initialOrgs)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const orgsPerPage = 5

  useEffect(() => {
    const filtered = orgs.filter(org => 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || org.status === statusFilter)
    )
    setFilteredOrgs(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter, orgs])

  const handleStatusChange = (orgId: number) => {
    setOrgs(orgs.map(org => {
      if (org.id === orgId) {
        const newStatus = org.status === 'active' ? 'banned' : 'active'
        return { ...org, status: newStatus }
      }
      return org
    }))
  }

  const indexOfLastOrg = currentPage * orgsPerPage
  const indexOfFirstOrg = indexOfLastOrg - orgsPerPage
  const currentOrgs = filteredOrgs.slice(indexOfFirstOrg, indexOfLastOrg)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Quản lí tổ chức</h1>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Tìm kiếm tổ chức theo tên..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toàn bộ</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Thành viên</TableHead>
              <TableHead>Mind Maps</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrgs.map(org => (
              <TableRow key={org.id}>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.members}</TableCell>
                <TableCell>{org.mindMaps}</TableCell>
                <TableCell>{org.status}</TableCell>
                <TableCell>
                  <Button 
                    variant={org.status === 'active' ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleStatusChange(org.id)}
                    className='w-20'
                  >
                    {org.status === 'active' ? 'Ban' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Trước
        </Button>
        <span>Trang {currentPage} của {Math.ceil(filteredOrgs.length / orgsPerPage)}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredOrgs.length / orgsPerPage)))}
          disabled={indexOfLastOrg >= filteredOrgs.length}
          variant="outline"
        >
          Sau <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}