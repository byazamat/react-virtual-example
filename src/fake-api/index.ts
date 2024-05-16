import { useCallback, useState } from "react";
import { faker } from "@faker-js/faker/locale/en";
import {
  MessageType,
  UserType,
} from "../components/message-item/message-item.type";

type GetMessagesProps = [UserType, UserType];

type GetDataProps = {
  isSuccess?: boolean;
  limit?: number;
  content?: {
    min: number;
    max: number;
  };
  delay?: number;
};
type GetDataReturnType = {
  data: MessageType[];
  message: string;
  statusCode: number;
};
type GetMessageReturnType = [
  (state: GetDataProps) => Promise<GetDataReturnType>,
  { isLoading: boolean; isError: boolean }
];

const generateRandomNumber = (min: number, max: number) => {
  if (min > max)
    throw new Error("'min' number should be less then 'max' number");
  return Math.floor(Math.random() * (max - min) + min);
};

export const useGetMessages = (
  users: GetMessagesProps
): GetMessageReturnType => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const getData = useCallback(
    ({
      isSuccess = true,
      limit = 20,
      content = { min: 10, max: 100 },
      delay = 1000,
    }: GetDataProps) =>
      new Promise<GetDataReturnType>(async (resolve, reject) => {
        setLoading(true);
        const data = Array.from({ length: limit }, (_, index) => ({
          id: faker.database.mongodbObjectId(),
          user: users[generateRandomNumber(0, 2)],
          date: faker.date.past().toLocaleString(),
          content: faker.lorem.words(
            generateRandomNumber(content.min, content.max)
          ),
        }));
        setTimeout(() => {
          setLoading(false);
          if (isSuccess) {
            resolve({
              data,
              message: "success",
              statusCode: 200,
            });
          } else {
            setError(true);
            reject({ message: "Some error ocures" });
          }
        }, delay);
      }),
    [isLoading, setLoading, isError, setError]
  );

  return [getData, { isLoading, isError }];
};
