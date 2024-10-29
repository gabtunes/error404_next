import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Charts.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ERROR Charts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <div id={styles.header}>
        <img src='logo.jpg' />
        <div id={styles.menu}>
          <div className={styles.dropdown}>
            <div className={styles.dropbtn}>2024<span className='material-icons'>expand_more</span></div>
            <div className={styles.dropdowncontent}>
              <a href=''>2023</a>
              <a href=''>2022</a>
              <a href=''>2021</a>
            </div>
          </div>
          <a href="" className={styles.dropbtn}>Charts</a>
          <a href="" className={styles.dropbtn}>Bubbling Under</a>
        </div>
      </div>
      <div id='table'>
      </div>
    </div>
  );
};

export default Home;
            
    /*    
       p Ainda não existem logs suficientes. p -- if noupdatep Não são mais adimitidas entradas de filme nos charts desse ano. else if limite && bubbling      
        } else {    
            if($bubbling){
                echo "<div className='filme'>";
                echo "<div className='titulo'></div>";
                echo "<div className='membro'><soan className='material-icons'>visibility</span></div>";
                echo "</div>";
            }
            $index = 1;
            foreach ($query->getResult('array') as $row) {
                if($query_ant === null){
                    $found = false;
                } else {
                    $found = array_search($row['id_filme'], array_column($query_ant->getResult('array'), 'id_filme'));
                } 
                echo "<div className='filme'>";
                if($bubbling === false){                    
                    echo "<div className='posicao'>" . $index . "</div>";
                }
                echo "<div className='titulo'>" . $row['titulo'] . "</div>";
                
                if(!$bubbling){
                    if($row['oscar'] != NULL){
                        if($row['oscar'] == 0){
                            echo "<div className='oscar'><img width='20px' src='". base_url(). "/oscar_nom.svg' /></div>";
                        } else if ($row['oscar'] == 1){
                            echo "<div className='oscar'><img width='20px' src='". base_url(). "/oscar_win.svg' /></div>";
                        }
                    } else {
                        echo "<div className='oscar'><div style='width:20px'><br></div></div>";
                    }
                }
                
                if($bubbling === false){
                    if($limite === false){
                        echo "<div className='status'>";
                        if($found === false){
                            echo "<span style='color:#229de3' className='material-icons'>fiber_new</span>";
                        } else if ($found + 1 == $index) {
                            echo "<span style='color:#ffd00f; rotate: 90deg' className='material-icons'>pause_circle</span>";
                        } else if ($found + 1 > $index){
                            echo "<span style='color:#06f712; rotate: -90deg' className='material-icons'>play_circle</span>";
                        } else if ($found + 1 < $index){
                            echo "<span style='color:#fa0315; rotate: 90deg' className='material-icons'>play_circle</span>";
                        }
                        echo "</div>";
                    }
    
                    echo "<div className='media'>" . $row['media'] . "</div>";
                    
                    echo "<div><div className='percent'>";
    
                    if($row['percent'] >= 60){
                        if($row['membros'] >= 15 && $row['fresh'] >= 70){
                            echo "<img width='30px' src='" . base_url() . "/certified.svg'>";
                        } else {
                            echo "<img width='30px' src='" . base_url() . "/fresh.svg'>";
                        }    
                    } else {
                        echo "<img width='30px' src='" . base_url() . "/rotten.svg'>";
                    }
    
                    echo "<div>" . $row['percent'] . "%</div></div></div>";
                    echo "<div><span className='expand material-icons'></span></div>";
                    
                } else {
                    echo "<div className='membro'>" . $row['membros'] . "</div>";
                }
        </div>
    
                if(!$bubbling){
                    echo "<div className='details'>";
    
                    $index2 = 0;
                    $array_logs_aux = [];
                    $array_logs = [];
                    $val_media = [];
                    foreach($logs->getResult('array') as $log){
                        if($log['tmdb'] == $row['id_filme']){
                            $notas = [];
                            if($index2 > 0){
                                foreach($array_logs_aux as $log_filme){
                                    if($log_filme['membro'] !== $log['membro']){                                
                                        $notas[] = $log_filme['nota'];
                                    } else {
                                        $found2 = array_search($log['membro'], array_column($array_logs_aux, 'membro'));
                                        if($found2 !== FALSE){
                                            array_splice($array_logs_aux, $found2, 1);
                                        }
                                    }
                                }
                            }
    
                            if($log['nota'] != NULL){
                                $notas[] = $log['nota'];
                                $array_logs_aux[] = $log;
                            }                    
                            
                            if(count($notas) > 0){
                                $val_media[] = array_sum($notas)/count($notas);
                            }
    
                            $array_logs[] = $log;
    
                            $index2++;
                        }
                    }
                    
                    $points = "";
                    $circles = "";
                    foreach($val_media as $key => $media){
                        $cx = ((120/(count($val_media) - 1))*$key) + 15;
                        $cy = ($media * -20) + 105;
    
                        $points .= $cx . "," . $cy . " ";
    
                        $watched = "";
    
                        if($array_logs[$key]['watched'] == 1){
                            $watched = "watched";
                        }
    
                        $circles .= "<circle id='log_". $array_logs[$key]['id'] . "' className='". $watched . "' cx='" . $cx . "' cy='" . $cy . "' r='1.5' fill='grey'/>";
                    }
                    
                    $hist = ["5" => 0, "4.5" => 0, "4" => 0, "3.5" => 0, "3" => 0, "2.5" => 0, "2" => 0, "1.5" => 0, "1" => 0, "0.5" => 0];
                    
                    foreach($array_logs_aux as $log){
                        $hist[strval($log['nota'])]++;
                    }
    
                    $max_hist = max($hist);
    
                    echo "<div className='graph'>
                            <div className='graph-media'><span style='font-size:14px' className='material-icons'>star</span></div>
                            <svg viewBox='0 0 150 101' xmlns='http://www.w3.org/2000/svg'>
                                <defs>
                                </defs>";
    
                                foreach($hist as $key => $n_logs){
                                    echo "<line x1='1' y1='" . ((floatval($key) * - 20) + 105) . "' x2='149' y2='" . ((floatval($key) * - 20) + 105) . "' value='". ((110/$max_hist) * $n_logs + 1)."' stroke='#ccc' />";
                                    if($n_logs > 0){
                                        echo "<g className='texto'>";
                                        echo "<text style='fill:#fff;font-size:4px' text-anchor='start' x='5' y='" . ((floatval($key) * - 20) + 106) . "'>". $key ."</text>";
                                        echo "<text style='fill:#00e054;font: bold 6px sans-serif;' text-anchor='start' x='" .  ((110/$max_hist) * $n_logs + 3) . "' y='" . ((floatval($key) * -20) + 107) . "'>". $n_logs ."</text>";
                                        echo "</g>";
                                    }
                                }
                                
                                
    
                                echo "<!-- Coordinate axes with an arrowhead in both directions -->
                                <polyline
                                    points='1,0 1,50 1,100 150,100'
                                    fill='none'
                                    stroke='#999'
                                    stroke-width='.5' />
    
                                <!-- Data line with polymarkers -->
                                <g className='val_media'>
                                    <polyline
                                        points='" . $points . "'
                                        fill='none'
                                        stroke='grey'
                                        />
    
                                    ". $circles. "
                                </g>
                            </svg>
    
                            <div style='display:flex; align-items:center' className='graph-tempo'><span style='margin-right:5px; font-size:10px' className='material-icons'>people_alt</span><span style='margin-right:4px; font-size:12px; rotate: 90deg' className='material-icons'>import_export</span><span style='font-size:14px' className='material-icons'>schedule</span></div>
                        </div>
                    </div>";
                }
                $index++;
            }
        }

    ?>
    </div>
    </div>*/