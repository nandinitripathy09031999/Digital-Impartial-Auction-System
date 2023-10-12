import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.Watcher;
import java.io.IOException;
public class LeaderElection implements Watcher
{
    private static final String ZOOKEEPER_ADDRESS="localhost:2181";
    private static final int SESSION_TIMEOUT=3000;
    private ZooKeeper zooKeeper;
    public static void main(String args[]) throws IOException, InterruptedException
    {
        LeaderElection leaderElection = new LeaderElection();
        leaderElection.connectToZookeeper();
        leaderElection.run();
        leaderElection.close();
        System.out.println("Disconnected from Zookeeper, Exiting from Application");

    }
    public void connectToZookeeper() throws IOException
    {
        this.zooKeeper= new ZooKeeper(ZOOKEEPER_ADDRESS,SESSION_TIMEOUT, watcher: this)
    }

    public void run() throws InterruptedException
    {
        synchronized(zooKeeper)
        {
            zooKeeper.wait();
        }
    }

    public void close() throws InterruptedException
    {
        zooKeeper.close();
    }

    @Override
    public void process(WatchedEvent event)
    {
        switch(event.getType())
        {
            case None:
            if(event.getState() == Event.KeeperState.SyncConnected)
            {
                System.out.println("Succcesfully Connected to Zookeeper ! ");
            }
            else
            {
                synchronized(zooKeeper)
                {
                    System.out.println("Disconnected from event !");
                    zooKeeper.notifyAll();
                }
            }
            break;
        }
    }
}     