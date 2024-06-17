import ThemedText from '@/components/ThemedText'

import { Card } from 'primereact/card';
        
import { Slider } from 'primereact/slider';
        
export default async function Home() {
  return (
    <main className="">
      <div>
        <ThemedText type='heading'>
          Event App
        </ThemedText>
        <Card title="Simple Card">
    <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
    </p>
</Card>
<Slider value={10}  />
         
      </div>
    </main>
  );
}
