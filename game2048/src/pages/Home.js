import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <div class="welcome-text">
        <h1>Welcome to 2048!</h1>
      </div>

      <main>
        <section>
          <h2>Rules</h2>
          <p>Combine blocks with the same numbers to reach a higher number.</p>
          <p>
            Move blocks around the grid. When two blocks with the same number
            collide, they merge into one.
          </p>
        </section>

        <section>
          <h2>How to Play</h2>
          <p>
            Use your arrow keys to move the blocks in the desired direction.
          </p>
          <p>The game ends when there are no possible moves left.</p>
        </section>

        <section>
          <h2>Fun Facts</h2>
          <p>
            The 2048 game was created in March 2014 by <i>Gabriele Cirulli</i>.
            It went viral and became one of the most popular puzzle games of all
            time!
          </p>
          <p>
            <b>Did you know?</b> The highest possible tile in 2048 is 131,072 —
            though it’s nearly impossible to achieve.
          </p>
        </section>

        <section>
          <h2>About Us</h2>
          <div class="about-us">
            <div>
              <h3>Hilal Karsli</h3>
              <p>Designing for players, thinking like a gamer.</p>
            </div>
            <div>
              <h3>Artur Sloyan</h3>
              <p>Master of tiny wins and epic comebacks.</p>
            </div>
            <div>
              <h3>Nika Zupancic</h3>
              <p>Writes code, refactors, regrets, repeats.</p>
            </div>
            <div class="collective">
              <p>
                Together, we’re the <b>ANH Games</b> team, fueled by energy
                drinks, endless retries and that sweet dopamine hit of a merged
                block.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
