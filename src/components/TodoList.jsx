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

export default function ({ items, deleted }) {
  const [modalData, setModalData] = useState({});
  const [isOpen, setOpen] = useState(false);
  const openModal = (data) => {
    setOpen(true);
    setModalData(data);
  };
  const closeModal = () => setOpen(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // set a loading state - disable the button
    // update the todo
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
        deleted(true); // refetch the items
        closeModal();
      })
      .catch((err) => console.log(err?.message));
  };
  return (
    <Card style={{ boxShadow: 'none' }}>
      <CardBody>
        <VStack>
          {items.map(
            ({ id, title, status, menu_order, excerpt }) => (

              <TodoItem
                key={id}
                title={decodeEntities(title.rendered)}
                id={id}
                status={status}
                deleted={deleted}
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
                    currentDate={
                      new Date(
                        stripTag(modalData.due)
                          .trim()
                          .toString()
                      )
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
