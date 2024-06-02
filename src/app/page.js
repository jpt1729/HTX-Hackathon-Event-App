import ThemedText from "@/components/ThemedText";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className='p-5'>
      <Card>
        <ThemedText type='subheading'>
          Average Event Title In my Opinion
        </ThemedText>
        <ThemedText type='paragraph'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui vivamus arcu felis bibendum ut. Praesent elementum facilisis leo vel fringilla. Tellus integer feugiat scelerisque varius. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Et leo duis ut diam quam nulla porttitor massa id. 
        </ThemedText>
        <ThemedText icon='location_on' type='paragraph'>
          9/11/2023
        </ThemedText>
      </Card>
    </main>
  );
}
