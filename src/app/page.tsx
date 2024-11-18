
export default function Home() {
  return (
    <div>

      <form action="./api/data" method="post">

          <label htmlFor="name">Enter Name </label>
          <input type="text" name="name" id="name" />


          <label htmlFor="age"> Enter Age </label>
          <input type="text" name="age" id="age" />

          <input type="submit" value="submit" />

      </form>
    </div>
  );
}
