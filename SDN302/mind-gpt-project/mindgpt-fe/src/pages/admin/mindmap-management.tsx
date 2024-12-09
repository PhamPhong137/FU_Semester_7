import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ChevronLeft, ChevronRight, Users, Building2, MapIcon } from 'lucide-react'

const initialMindmaps = [
  { id: 1, name: 'Project Brainstorm', author: 'John Doe', createdDate: '2023-05-15', status: 'active' },
  { id: 2, name: 'Marketing Strategy', author: 'Jane Smith', createdDate: '2023-06-02', status: 'active' },
  { id: 3, name: 'Product Roadmap', author: 'Bob Johnson', createdDate: '2023-06-10', status: 'banned' },
  { id: 4, name: 'Team Goals', author: 'Alice Brown', createdDate: '2023-06-18', status: 'active' },
  { id: 5, name: 'Budget Planning', author: 'Charlie Davis', createdDate: '2023-06-25', status: 'banned' },
  { id: 6, name: 'Customer Feedback', author: 'Eva Martinez', createdDate: '2023-07-03', status: 'active' },
  { id: 7, name: 'Competitor Analysis', author: 'Frank Taylor', createdDate: '2023-07-11', status: 'active' },
  { id: 8, name: 'Employee Onboarding', author: 'Grace Lee', createdDate: '2023-07-19', status: 'banned' },
]

const summaryData = {
  totalMindmaps: 237,
  totalUsers: 1024,
  totalOrganizations: 56
}

export function MindmapManagement() {
  const [mindmaps, setMindmaps] = useState(initialMindmaps)
  const [filteredMindmaps, setFilteredMindmaps] = useState(initialMindmaps)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const mindmapsPerPage = 5

  useEffect(() => {
    const filtered = mindmaps.filter(mindmap => 
      mindmap.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || mindmap.status === statusFilter)
    )
    setFilteredMindmaps(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter, mindmaps])

  const handleStatusChange = (mindmapId: number) => {
    setMindmaps(mindmaps.map(mindmap => {
      if (mindmap.id === mindmapId) {
        const newStatus = mindmap.status === 'active' ? 'banned' : 'active'
        return { ...mindmap, status: newStatus }
      }
      return mindmap
    }))
  }

  const indexOfLastMindmap = currentPage * mindmapsPerPage
  const indexOfFirstMindmap = indexOfLastMindmap - mindmapsPerPage
  const currentMindmaps = filteredMindmaps.slice(indexOfFirstMindmap, indexOfLastMindmap)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Quản lí Mindmap</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Tổng số Mindmaps</CardTitle>
            <MapIcon className="h-4 w-4 text-muted-foreground text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{summaryData.totalMindmaps}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Tổng số Người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{summaryData.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Tổng số Tổ chức</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{summaryData.totalOrganizations}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Tìm kiếm mindmap theo tên..."
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
              <TableHead>Tác giả</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMindmaps.map(mindmap => (
              <TableRow key={mindmap.id}>
                <TableCell>{mindmap.name}</TableCell>
                <TableCell>{mindmap.author}</TableCell>
                <TableCell>{mindmap.createdDate}</TableCell>
                <TableCell>{mindmap.status}</TableCell>
                <TableCell>
                  <Button 
                    variant={mindmap.status === 'active' ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleStatusChange(mindmap.id)}
                    className='w-20'
                  >
                    {mindmap.status === 'active' ? 'Ban' : 'Activate'}
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
        <span>Trang {currentPage} của {Math.ceil(filteredMindmaps.length / mindmapsPerPage)}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredMindmaps.length / mindmapsPerPage)))}
          disabled={indexOfLastMindmap >= filteredMindmaps.length}
          variant="outline"
        >
          Sau <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}