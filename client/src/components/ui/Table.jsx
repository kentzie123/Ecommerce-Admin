// rizz ui
import {
  Checkbox,
  Popover,
  Table as RizzTable,
  Tooltip,
  Button,
  Select,
  Title,
  Text,
} from "rizzui";

// icons
import {
  Pencil,
  Trash2,
} from "lucide-react";


export const Table = ({ data, headers }) => {
  

  return (
    <div>
      <div className="overflow-hidden rounded-md text-sm">
        <RizzTable variant="classic">
          <RizzTable.Header>
            <RizzTable.Row>
              {headers.map((header, idx) => (
                <RizzTable.Head key={idx} className={header.className}>
                  {header.label}
                </RizzTable.Head>
              ))}
            </RizzTable.Row>
          </RizzTable.Header>
          <RizzTable.Body>
            {data.map((d, i) => (
              <RizzTable.Row key={i}>
                <RizzTable.Cell className="!pl-5">
                  <Checkbox />
                </RizzTable.Cell>
                <RizzTable.Cell>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={d.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </RizzTable.Cell>
                <RizzTable.Cell className="font-bold text-sm">
                  {d.name}
                </RizzTable.Cell>
                <RizzTable.Cell>{d.description}</RizzTable.Cell>
                <RizzTable.Cell>{d.slug}</RizzTable.Cell>
                <RizzTable.Cell className="!text-center">
                  {d.products}
                </RizzTable.Cell>
                <RizzTable.Cell className="flex items-center gap-3">
                  <Tooltip content={"Edit Category"} color="invert">
                    <Button size="sm" variant="outline">
                      <Pencil className="size-4 text-base-content/80" />
                    </Button>
                  </Tooltip>
                  <Popover>
                    <Popover.Trigger>
                      <Button variant="outline" size="sm">
                        <Trash2 className="size-4 text-base-content/80" />
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                      {({ setOpen }) => (
                        <div className="w-56">
                          <Title className="flex items-center gap-2" as="h6">
                            <Trash2 className="size-4" />
                            Delete category
                          </Title>
                          <Text className="text-sm text-base-300/70">
                            Are you sure you want to delete this category?
                          </Text>
                          <div className="flex justify-end gap-3 mb-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setOpen(false)}
                            >
                              No
                            </Button>
                            <Button size="sm" onClick={() => setOpen(false)}>
                              Yes
                            </Button>
                          </div>
                        </div>
                      )}
                    </Popover.Content>
                  </Popover>
                </RizzTable.Cell>
              </RizzTable.Row>
            ))}
          </RizzTable.Body>
        </RizzTable>
      </div>
    </div>
  );
};

export default Table;
