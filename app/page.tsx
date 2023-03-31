import { PrismaClient, Todo } from '../prisma/generated/todo';
import { PrismaClient as PrismaClientBackup } from '../prisma/generated/todoBackup';
import { Inter } from 'next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

type HomeProps = { todoList: Todo[] };

async function getTodoList() {
	const prisma = new PrismaClient();
	const prismaBackup = new PrismaClientBackup();
	const todoList: Todo[] = await prisma.todo.findMany();
	const todoBackupList: Todo[] = await prismaBackup.todoBackup.findMany();
	const data: HomeProps = {
		todoList: [
			...JSON.parse(JSON.stringify(todoList)),
			...JSON.parse(JSON.stringify(todoBackupList)),
		],
	};

	return data;
}

export default async function Home() {
	const { todoList } = await getTodoList();

	return (
		<main className={styles.main}>
			<div className={styles.grid}>
				{todoList?.map((todo) => (
					<div key={todo.id}>{todo.title}</div>
				))}
			</div>
		</main>
	);
}
