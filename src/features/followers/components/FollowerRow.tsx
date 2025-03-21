import React from "react";
import { tw } from "@/shared/utils/tw";
import { Follower } from "../types";
import { TableRow } from "@/shared/components/base/TableRow";
import { Typography } from "@/shared/components/base/Typography";

type FollowerRowProps = {
  follower: Follower;
  isFirstRow?: boolean;
};

export const FollowerRow = ({ follower, isFirstRow }: FollowerRowProps) => {
  return (
    <TableRow isFirstRow={isFirstRow}>
      <Typography variant="body">{follower.name}</Typography>
      <Typography
        variant="body"
        style={tw`${
          follower.status === "active" ? "text-green-500" : "text-amber-500"
        }`}
      >
        {follower.status === "active" ? "Active" : "Pending"}
      </Typography>
    </TableRow>
  );
};
