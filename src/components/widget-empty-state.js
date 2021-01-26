import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@chakra-ui/react";

export function WidgetEmptyState() {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      m={4}
    >
      <AlertTitle mt={4} mb={1} fontSize="lg">
        <span role={"img"} aria-label={"work in progress"}>
          🚧
        </span>
        Work in progress!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Sorry for the lack of information. We are currently working on
        improvements.
      </AlertDescription>
    </Alert>
  );
}
