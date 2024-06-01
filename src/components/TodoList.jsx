import apiFetch from '@wordpress/api-fetch';
import {
  Button,
  Card,
  CardBody,
  DatePicker,
  Flex,
  FlexBlock,
  Modal,
  TextareaControl,
  __experimentalVStack as VStack,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { stripTag } from '../functions';
import TodoItem from './TodoItem';
import { useQuery } from '@tanstack/react-query'

export default function TodoList() {
  const [modalData, setModalData] = useState({});
  const [isOpen, setOpen] = useState(false);
  const openModal = (data) => {
    setOpen(true);
    setModalData(data);
  };
  const closeModal = () => setOpen(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    apiFetch({
      path: `/wp/v2/todo/${modalData.id}`,
      method: 'PUT',
      data: {
        title: modalData.title,
        menu_order: modalData.priority,
        excerpt: modalData.due,
      },
    })
      .then(() => {
        closeModal();
      })
      .catch((err) => console.log(err?.message));
  };
  const _q = new URLSearchParams({
    _fields: 'id,title,status,menu_order,excerpt',
    status: 'pending,publish',
    per_page: 100,
    orderby: 'menu_order',
  });

  const query = useQuery({
    queryKey: ['todos'],
    queryFn: () => apiFetch({ path: `/wp/v2/todo?${_q}` })
  })
  return (
    <Card style={{ boxShadow: 'none' }}>
      <CardBody>
        <VStack>
          {query.data?.map(
            ({ id, title, status, menu_order, excerpt }) => (
              <TodoItem
                key={id}
                title={decodeEntities(title.rendered)}
                id={id}
                status={status}
                // deleted={deleted}
                due={excerpt.rendered}
                priority={menu_order}
                openModal={openModal}
              />
            )
          )}
        </VStack>
        {isOpen && (
          <Modal
            className="dash-todo-modal"
            style={{ minWidth: '600px' }}
            onRequestClose={closeModal}
            isDismissible={false}
          >
            <form onSubmit={handleFormSubmit}>
              <Flex align="flex-start" gap={8}>
                <FlexBlock>
                  <TextareaControl
                    required
                    autoFocus
                    label={'Description'}
                    onChange={(value) =>
                      setModalData({
                        ...modalData,
                        title: value,
                      })
                    }
                    value={modalData.title}
                    rows={16}
                  />
                </FlexBlock>
                <FlexBlock>
                  <ToggleGroupControl
                    isBlock
                    label="Priority"
                    value={String(modalData.priority)}
                    onChange={(value) =>
                      setModalData({
                        ...modalData,
                        priority: Number(value),
                      })
                    }
                  >
                    <ToggleGroupControlOption
                      value="3"
                      label="High"
                    />
                    <ToggleGroupControlOption
                      value="2"
                      label="Medium"
                    />
                    <ToggleGroupControlOption
                      value="1"
                      label="Low"
                    />
                    <ToggleGroupControlOption
                      value="0"
                      label="None"
                    />
                  </ToggleGroupControl>

                  <DatePicker
                    currentDate={modalData.due ?
                      new Date(
                        stripTag(modalData.due)
                          .trim()
                          .toString()
                      ) : null
                    }
                    onChange={(newDate) =>
                      setModalData({
                        ...modalData,
                        due: newDate,
                      })
                    }
                  />
                </FlexBlock>
              </Flex>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </form>
          </Modal>
        )}
      </CardBody>
    </Card>
  );
}
