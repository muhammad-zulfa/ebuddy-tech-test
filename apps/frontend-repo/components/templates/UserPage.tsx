"use client";
import { User } from "@/apis/user";
import { dataFetched, fetchingData } from "@/store/actions";
import { RootState } from "@/store/store";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { format } from "date-fns";
import { FC } from "react";
import { connect } from "react-redux";

interface UserPageProps {
  users: User[];
  isLoading: boolean;
  fetchingData: () => void;
  dataFetched: (data: User[]) => void;
}

const UserPage: FC<UserPageProps> = ({
  users,
  isLoading,
  dataFetched,
  fetchingData,
}) => {
  const fetchUsers = async () => {
    fetchingData();
    const res = await fetch("/api/users");
    const data = await res.json();
    dataFetched(data.data);
  };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={fetchUsers}
          loading={isLoading}
        >
          Get user
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 4,
            width: "80%",
          }}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell component="th">
                    totalAverageWeightRatings
                  </TableCell>
                  <TableCell component="th">numberOfRents</TableCell>
                  <TableCell component="th">recentlyActive</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length === 0 ? (
                  <TableRow sx={{ ":last-child > td": { border: "none" } }}>
                    <TableCell colSpan={3} align="center">
                      No data
                    </TableCell>
                  </TableRow>
                ) : (
                  users?.map((user: User, idx: number) => (
                    <TableRow
                      key={idx}
                      sx={{ ":last-child > td": { border: "none" } }}
                    >
                      <TableCell>{user.totalAverageWeightRatings}</TableCell>
                      <TableCell>{user.numberOfRents}</TableCell>
                      <TableCell>
                        {format(
                          user.recentlyActive * 1000,
                          "yyyy-MM-dd HH:mm:ss"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.users.users,
  isLoading: state.users.isLoading,
});

const mapActionsToProps = {
  fetchingData,
  dataFetched,
};
export default connect(mapStateToProps, mapActionsToProps)(UserPage);
