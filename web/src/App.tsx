import styles from './App.module.scss';

import { MessageList } from './components/MessageList';
import { LoginBox } from './components/LoginBox';
import { SendMessageForm } from './components/SendMessageForm';

import { useAuth } from './contexts/auth';

export function App() {
  const { user } = useAuth();

  return (
    <main className={`${styles.contentWrapper} ${user && styles.contentSigned}`}>
      <MessageList />
      {user && user.id ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}
