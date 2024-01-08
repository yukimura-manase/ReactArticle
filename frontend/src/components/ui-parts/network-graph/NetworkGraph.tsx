import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";

interface NodeType {
  id: string | number;
  label: string;
  shape: string;
  image: string;
}

interface EdgeType {
  from: string | number;
  to: string | number;
}

interface NodeEdgeDataSet {
  nodes: NodeType[];
  edges: EdgeType[];
}

/**
 * NOTE: generateDataFromNodes
 * => Nodes と Edges を定義して、返却する Func
 * => 引数: nodes, parentNodeId
 * => nodes はノードの情報を含む配列
 * => parentNodeId は親ノードのID
 */
const generateDataFromNodes: any = (
  nodes: NodeType[],
  parentNodeId: string | number
) => ({
  nodes: nodes,
  /** from 親・Node => to 子・Node に向かって、Edges(枝)を伸ばす */
  edges: nodes.map((node: NodeType) => ({ from: parentNodeId, to: node.id })),
});

// ----------------------------------- Node Data 領域 -----------------------------------

/**
 * 第一階層の Node & それに紐づいた 5つの第二階層の Node の設定値
 */
const controlNodes = [
  // 1つ目の Node設定
  {
    id: "robo_tamachan12", // ノードの一意の識別子です。この ID はネットワーク内でこのノードを一意に特定するために使用
    label: "ロボ玉 Ver.2", // ノードのラベル => この場合、"Extracted Files (3)" というテキストがノードに表示されます。
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://dzdih2euft5nz.cloudfront.net/users/avatars/909381?1664074598",
  },
  // 2つ目以降の Node設定
  {
    id: "girl_1",
    label: "ガール_1",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://pbs.twimg.com/profile_images/1620230831892754432/2SQFDJSA_400x400.jpg",
  },
  {
    id: "girl_2",
    label: "ガール_2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://m.media-amazon.com/images/I/61kr0JvtxML._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "girl_3",
    label: "ガール_3",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://eiga.k-img.com/images/person/88674/9169af40192118d8/640.jpg?1627093516",
  },
  {
    id: "space_broccoli",
    label: "スペース・ブロッコリー",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://d1q9av5b648rmv.cloudfront.net/v3/500x500/cushion/free/white/front/12256617/1664106143-512x512.png.7.3047+0.0+0.0.jpg?h=1af54b2d021d1ca0ed9c8f1210d7d7122231c91f&printed=true",
  },
];

const Node_1 = [
  {
    id: "copy_robo_1_1",
    label: "ロボ玉 Ver.2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://dzdih2euft5nz.cloudfront.net/users/avatars/909381?1664074598",
  },
  {
    id: "copy_robo_1_2",
    label: "ロボ玉 Ver.2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://dzdih2euft5nz.cloudfront.net/users/avatars/909381?1664074598",
  },
  {
    id: "copy_robo_1_3",
    label: "ロボ玉 Ver.2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://dzdih2euft5nz.cloudfront.net/users/avatars/909381?1664074598",
  },
  {
    id: "copy_robo_1_4",
    label: "ロボ玉 Ver.2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://dzdih2euft5nz.cloudfront.net/users/avatars/909381?1664074598",
  },
  {
    id: "copy_robo_1_5",
    label: "ロボ玉 Ver.2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://dzdih2euft5nz.cloudfront.net/users/avatars/909381?1664074598",
  },
];

const Node_2 = [
  {
    id: "copy_girl_2_1",
    label: "ガール_2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://m.media-amazon.com/images/I/61kr0JvtxML._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "copy_girl_2_2",
    label: "ガール_2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://m.media-amazon.com/images/I/61kr0JvtxML._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "copy_girl_2_3",
    label: "ガール_2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://m.media-amazon.com/images/I/61kr0JvtxML._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "copy_girl_2_4",
    label: "ガール_2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://m.media-amazon.com/images/I/61kr0JvtxML._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "copy_girl_2_5",
    label: "ガール_2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://m.media-amazon.com/images/I/61kr0JvtxML._AC_UF894,1000_QL80_.jpg",
  },
];

const Nodes_3 = [
  {
    id: "nw_1",
    label: "ガール_3",
    shape: "circularImage",
    image:
      "https://eiga.k-img.com/images/person/88674/9169af40192118d8/640.jpg?1627093516",
  },
  {
    id: "nw_2",
    label: "ガール_3",
    shape: "circularImage",
    image:
      "https://eiga.k-img.com/images/person/88674/9169af40192118d8/640.jpg?1627093516",
  },
  {
    id: "nw_3",
    label: "ガール_3",
    shape: "circularImage",
    image:
      "https://eiga.k-img.com/images/person/88674/9169af40192118d8/640.jpg?1627093516",
  },
  {
    id: "nw_4",
    label: "ガール_3",
    shape: "circularImage",
    image:
      "https://eiga.k-img.com/images/person/88674/9169af40192118d8/640.jpg?1627093516",
  },
  {
    id: "nw_5",
    label: "ガール_3",
    shape: "circularImage",
    image:
      "https://eiga.k-img.com/images/person/88674/9169af40192118d8/640.jpg?1627093516",
  },
];

const Nodes_4 = [
  {
    id: "copy_robotama_1",
    label: "ロボ玉",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
  },
  {
    id: "copy_robotama_2",
    label: "ロボ玉",
    shape: "circularImage",
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
  },
  {
    id: "copy_robotama_3",
    label: "ロボ玉",
    shape: "circularImage",
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
  },
  {
    id: "copy_robotama_4",
    label: "ロボ玉",
    shape: "circularImage",
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
  },
  {
    id: "copy_robotama_5",
    label: "ロボ玉",
    shape: "circularImage",
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
  },
];

const Nodes_5 = [
  {
    id: "copy_space_broccoli_1",
    label: "スペース・ブロッコリー",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://d1q9av5b648rmv.cloudfront.net/v3/500x500/cushion/free/white/front/12256617/1664106143-512x512.png.7.3047+0.0+0.0.jpg?h=1af54b2d021d1ca0ed9c8f1210d7d7122231c91f&printed=true",
  },
  {
    id: "copy_space_broccoli_2",
    label: "スペース・ブロッコリー",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://d1q9av5b648rmv.cloudfront.net/v3/500x500/cushion/free/white/front/12256617/1664106143-512x512.png.7.3047+0.0+0.0.jpg?h=1af54b2d021d1ca0ed9c8f1210d7d7122231c91f&printed=true",
  },
  {
    id: "copy_space_broccoli_3",
    label: "スペース・ブロッコリー",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://d1q9av5b648rmv.cloudfront.net/v3/500x500/cushion/free/white/front/12256617/1664106143-512x512.png.7.3047+0.0+0.0.jpg?h=1af54b2d021d1ca0ed9c8f1210d7d7122231c91f&printed=true",
  },
  {
    id: "copy_space_broccoli_4",
    label: "スペース・ブロッコリー",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://d1q9av5b648rmv.cloudfront.net/v3/500x500/cushion/free/white/front/12256617/1664106143-512x512.png.7.3047+0.0+0.0.jpg?h=1af54b2d021d1ca0ed9c8f1210d7d7122231c91f&printed=true",
  },
  {
    id: "copy_space_broccoli_5",
    label: "スペース・ブロッコリー",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://d1q9av5b648rmv.cloudfront.net/v3/500x500/cushion/free/white/front/12256617/1664106143-512x512.png.7.3047+0.0+0.0.jpg?h=1af54b2d021d1ca0ed9c8f1210d7d7122231c91f&printed=true",
  },
];

// ----------------------------------- Node Data 領域 Fin -----------------------------------

/** NOTE: generateDataFromNodes() で Nodes から Data を生成する */

/** 中央に表示する 第一階層の Nodes & Edges */
const initialData = generateDataFromNodes(controlNodes, "rootNode");

/** 第二階層以降の Nodes & Edges */
const NodeData_1 = generateDataFromNodes(Node_1, "robo_tamachan12");
const NodeData_2 = generateDataFromNodes(Node_2, "girl_1");
const NodeData_3 = generateDataFromNodes(Nodes_3, "girl_2");
const NodeData_4 = generateDataFromNodes(Nodes_4, "girl_3");
const NodeData_5 = generateDataFromNodes(Nodes_5, "space_broccoli");

/** Network図 */
let network: any;

/** Network図 の Component */
const NetworkGraph = () => {
  /** DOMを参照できるように useRef を使用して Element を取得する */
  const ref = useRef<HTMLDivElement>(null);

  /** Network図を Create する処理 (初期表示) */
  useEffect(() => {
    /**
     * 1. Node の配列を作成します
     * => DataSet オブジェクトはグラフデータを保持して、管理するために使用します。
     */
    const nodes = new DataSet([
      // CenterNode
      {
        id: "rootNode",
        label: "ロボ玉",
        type: "diamond",
        shape: "circularImage", // これだけで、丸い写真になる！！
        image:
          "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
      },
      ...initialData.nodes,
      ...NodeData_1.nodes,
      ...NodeData_2.nodes,
      ...NodeData_3.nodes,
      ...NodeData_4.nodes,
      ...NodeData_5.nodes,
    ]);

    /** 2. Edges を作成する */
    const edges = new DataSet([
      ...initialData.edges,
      ...NodeData_1.edges,
      ...NodeData_2.edges,
      ...NodeData_3.edges,
      ...NodeData_4.edges,
      ...NodeData_5.edges,
    ]);

    /** 3. Option を追加する */
    const options = {
      /** physics オプションは、グラフの物理的シミュレーションに関する設定を指定します。*/
      physics: {
        // barnesHut は、物理エンジンの一部で、ノード間の相互作用を効率的に計算するためのアルゴリズムです。
        barnesHut: {
          /**
           * gravitationalConstant は、ノード間の引力定数を設定します。
           * この値はノード間の引力の強さを調整します。-4000という値は、引力が非常に強いことを示しており、ノードが強く引かれることを意味します。
           * これにより、ノードが密に配置され、よりクラスタリングされる可能性が高くなります。
           */
          gravitationalConstant: -4000,
        },
      },
      /** interaction オプションは、ユーザーとのインタラクションに関する設定を指定します。 */
      interaction: {
        // multiselect がtrueに設定されている場合、ユーザーは複数のノードを選択できるようになります。
        multiselect: true,
      },
    };

    // Network が存在しない場合の処理
    if (!network && ref.current) {
      // Network Instance を作成して、DataをSetする => new Network(Dom領域, Data(Nodes & Edges), Options)
      network = new Network(
        ref.current,
        {
          nodes: nodes,
          edges: edges,
        },
        options
      );
    }
  }, []);

  return (
    <div>
      {/* Network図 を表示する領域 */}
      <div style={{ height: 800, width: "100%" }} ref={ref} />
    </div>
  );
};

export default NetworkGraph;
