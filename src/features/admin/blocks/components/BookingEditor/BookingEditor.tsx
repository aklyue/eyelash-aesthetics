import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  IconButton,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

import DeleteConfirmModal from "../../../ui/components/DeleteConfirmModal";
import EditBookingModal from "../../../ui/components/EditBookingModal";
import { Link } from "react-router-dom";
import { useBookingEditActions } from "../../hooks";
import AddBookingModal from "../../../ui/components/AddBookingModal";

export function BookingEditor() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    bookedDates,
    setDeleteId,
    handleEditOpen,
    deleteId,
    handleDeleteConfirm,
    handleEditConfirm,
    handleAddConfirm,
    editData,
    setEditData,
    editId,
    setEditId,
    handleAddOpen,
    isAddOpen,
    setIsAddOpen,
    addData,
    setAddData,
  } = useBookingEditActions();

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
          }}
        >
          <Typography color="" variant="h6">
            Записи
          </Typography>
          <IconButton
            className="no-swipe"
            onClick={handleAddOpen}
            sx={{
              "&:hover": {
                color: isMobile ? undefined : "rgba(124, 167, 109, 1)",
                bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
              },
            }}
          >
            <Add />
          </IconButton>
        </Box>
        {bookedDates.map((b, index) => (
          <Accordion
            key={b.id}
            sx={{
              bgcolor: "rgba(0,0,0,0)",
              boxShadow: "none",
              "&:before": {
                display: index === 0 ? "none" : "block",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography>
                    <strong>{b.date.split("-").reverse().join(".")}</strong> —{" "}
                    {b.time}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <IconButton
                    className="no-swipe"
                    component="span"
                    sx={{
                      "&:hover": {
                        color: isMobile ? undefined : "rgba(203, 83, 83, 1)",
                        bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(b.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    className="no-swipe"
                    component="span"
                    sx={{
                      "&:hover": {
                        color: isMobile ? undefined : "rgba(83, 85, 203, 1)",
                        bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditOpen(b);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 4 }}>
              <Typography>
                {b.name}
                <Link
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    textDecoration: "none",
                    color: "rgba(172, 171, 171, 1)",
                  }}
                  to={`https://t.me/${b.telegram.replace("@", "")}`}
                >
                  ({b.telegram})
                </Link>
                — {b.service}{" "}
              </Typography>
              <Typography mt={2}>{b.details}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <DeleteConfirmModal
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDeleteConfirm}
        />

        <EditBookingModal
          open={!!editId}
          onClose={() => setEditId(null)}
          booking={editData}
          setBooking={setEditData}
          onConfirm={handleEditConfirm}
        />

        <AddBookingModal
          open={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          booking={addData}
          setBooking={setAddData}
          onConfirm={handleAddConfirm}
        />
      </Box>
    </Box>
  );
}
