import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCog,
  UserX,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock data for initial users
const initialUsers = [
  {
    id: 1,
    email: "john@example.com",
    name: "John Doe",
    membership: "basic",
    status: "active",
  },
  {
    id: 2,
    email: "jane@example.com",
    name: "Jane Smith",
    membership: "premium",
    status: "active",
  },
  {
    id: 3,
    email: "bob@example.com",
    name: "Bob Johnson",
    membership: "basic",
    status: "banned",
  },
  {
    id: 4,
    email: "alice@example.com",
    name: "Alice Brown",
    membership: "premium",
    status: "active",
  },
  {
    id: 5,
    email: "charlie@example.com",
    name: "Charlie Davis",
    membership: "basic",
    status: "banned",
  },
  {
    id: 6,
    email: "david@example.com",
    name: "David Wilson",
    membership: "premium",
    status: "active",
  },
  {
    id: 7,
    email: "eva@example.com",
    name: "Eva Martinez",
    membership: "basic",
    status: "active",
  },
  {
    id: 8,
    email: "frank@example.com",
    name: "Frank Taylor",
    membership: "premium",
    status: "banned",
  },
  {
    id: 9,
    email: "grace@example.com",
    name: "Grace Lee",
    membership: "basic",
    status: "active",
  },
  {
    id: 10,
    email: "henry@example.com",
    name: "Henry Clark",
    membership: "premium",
    status: "active",
  },
  {
    id: 11,
    email: "isabel@example.com",
    name: "Isabel Rodriguez",
    membership: "basic",
    status: "banned",
  },
  {
    id: 12,
    email: "jack@example.com",
    name: "Jack Thompson",
    membership: "premium",
    status: "active",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || user.status === statusFilter)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, users]);

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, membership: newRole } : user
      )
    );
  };

  const handleStatusChange = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const newStatus = user.status === "active" ? "banned" : "active";
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Quản lí người dùng</h1>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Tìm kiếm người dùng theo tên..."
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
              <TableHead>Email</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Hội viên</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Select
                    value={user.membership}
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select membership" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    variant={
                      user.status === "active" ? "destructive" : "default"
                    }
                    size="sm"
                    onClick={() => handleStatusChange(user.id)}
                    className="w-20"
                  >
                    {user.status === "active" ? (
                      <>
                        <UserX className="mr-2 h-4 w-4" />
                        Ban
                      </>
                    ) : (
                      <>
                        <UserCog className="mr-2 h-4 w-4" />
                        Mở
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Trước
        </Button>
        <span>
          Trang {currentPage} của {Math.ceil(filteredUsers.length / usersPerPage)}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredUsers.length / usersPerPage))
            )
          }
          disabled={indexOfLastUser >= filteredUsers.length}
          variant="outline"
        >
          Sau <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
