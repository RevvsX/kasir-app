import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ActivityLog = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <h1 className="font-bold text-2xl">Activity Log</h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Remmy</TableCell>
              <TableCell className="text-right">02-01-2025 19:00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Remmy</TableCell>
              <TableCell className="text-right">02-01-2025 19:00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">3</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Remmy</TableCell>
              <TableCell className="text-right">02-01-2025 19:00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">4</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Remmy</TableCell>
              <TableCell className="text-right">02-01-2025 19:00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">5</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Remmy</TableCell>
              <TableCell className="text-right">02-01-2025 19:00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
