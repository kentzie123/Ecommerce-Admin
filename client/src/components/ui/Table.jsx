// rizz ui
import {
  Checkbox,
  Popover,
  Table as RizzTable,
  Tooltip,
  Button,
  Title,
  Text,
} from "rizzui";

// Routing
import { Link } from "react-router-dom";

// icons
import { Pencil, Trash2 } from "lucide-react";

export const Table = ({ data = [], headers = [], editModalRoute }) => {
  return (
    <div>
      <div className="overflow-hidden rounded-md text-sm">
        <RizzTable variant="classic">
          {/* HEADER */}
          <RizzTable.Header>
            <RizzTable.Row>
              {headers.map((header, idx) => (
                <RizzTable.Head key={idx} className={header.className}>
                  {header.label}
                </RizzTable.Head>
              ))}
            </RizzTable.Row>
          </RizzTable.Header>

          {/* BODY */}
          <RizzTable.Body>
            {data.map((row, i) => (
              <RizzTable.Row key={i}>
                {headers
                  .filter((h) => h.visible)
                  .map((header, idx) => {
                    // Checkbox column
                    if (header.key === "select") {
                      return (
                        <RizzTable.Cell key={idx} className="!pl-5">
                          <Checkbox />
                        </RizzTable.Cell>
                      );
                    }

                    // Image column
                    if (header.key === "image") {
                      return (
                        <RizzTable.Cell key={idx}>
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={row.thumbnail.url || "/category_default.png"}
                                alt={row.name || "category"}
                              />
                            </div>
                          </div>
                        </RizzTable.Cell>
                      );
                    }

                    // Actions column
                    if (header.key === "actions") {
                      return (
                        <RizzTable.Cell
                          key={idx}
                          className="flex items-center gap-3"
                        >
                          <Tooltip content="Edit" color="invert">
                            <Link to={`${editModalRoute}/${row._id}`}>
                              <Button className="size-8 p-0" size="sm" variant="outline">
                                <Pencil className="size-4 opacity-75" />
                              </Button>
                            </Link>
                          </Tooltip>
                          <Popover>
                            <Popover.Trigger>
                              <Button className="size-8 p-0" variant="outline" size="sm">
                                <Trash2 className="size-4 opacity-75" />
                              </Button>
                            </Popover.Trigger>
                            <Popover.Content>
                              {({ setOpen }) => (
                                <div className="w-56">
                                  <Title
                                    className="flex items-center gap-2"
                                    as="h6"
                                  >
                                    <Trash2 className="size-4" />
                                    Delete category
                                  </Title>
                                  <Text className="text-sm text-base-300/70">
                                    Are you sure you want to delete this
                                    category?
                                  </Text>
                                  <div className="flex justify-end gap-3 mb-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setOpen(false)}
                                    >
                                      No
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => setOpen(false)}
                                    >
                                      Yes
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </Popover.Content>
                          </Popover>
                        </RizzTable.Cell>
                      );
                    }

                    // Default case → map schema fields
                    return (
                      <RizzTable.Cell
                        key={idx}
                        className={header.cellClassName}
                      >
                        {row[header.key]}
                      </RizzTable.Cell>
                    );
                  })}
              </RizzTable.Row>
            ))}
          </RizzTable.Body>
        </RizzTable>
      </div>
    </div>
  );
};

export default Table;
