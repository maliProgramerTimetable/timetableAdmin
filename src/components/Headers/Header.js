import { useEffect, useState } from "react";
import Modal from "react-modal";
import firebase from "../../firebase/firebase";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../../assets/css/navbar.css";
import {
  CardTitle,
  Button,
  Container,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Header = () => {
  const db = firebase.firestore();
  const schoolSendInfo = (data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((cred) => {
        const userId = cred.user.uid;
        const userData = {
          displayName: data.name,
          adress: data.adress,
          email: data.email,
          password: data.password,
        };
        db.collection(userId).doc(userId).set(userData);
        db.collection("schools").doc(userId).set({
          userData,
          userId,
        });
      })
      .catch((err) => console.log(err));
    reset();
    setModalIsOpen(false);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required(),
    adress: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Škola
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">143</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Od prošlog mjeseca</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Časovi
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">52,996</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Od zadnjeg tjedna</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Nastavnici
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">9,244</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up " /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Od jučer</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Od zadnjeg mjeseca</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Button
            className="my-4"
            color="primary"
            type="button"
            onClick={() => setModalIsOpen(true)}
          >
            Dodaj Novu Školu
          </Button>
        </Row>
      </Container>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName="z-index-big"
        className="modal-show"
      >
        <div className="modal-body">
          <i
            className="fa fa-times big-x"
            onClick={() => setModalIsOpen(false)}
          ></i>
          <div className="modal-container">
            <h1 className="create-school-title">Kreiraj Školu</h1>
            <Form role="form mt-5" onSubmit={handleSubmit(schoolSendInfo)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    placeholder="Email"
                    className="custom-input form-control"
                    type="email"
                    autoComplete="new-email"
                    {...register("email")}
                  />
                </InputGroup>
                {errors.email ? (
                  <p className="error-message">{errors.email?.message}</p>
                ) : (
                  <></>
                )}
              </FormGroup>
              <FormGroup className="">
                <InputGroup className="input-group-alternative input-group">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    placeholder="Lozinka"
                    className="custom-input form-control"
                    type="password"
                    autoComplete="new-password"
                    {...register("password")}
                  />
                </InputGroup>
                {errors.password ? (
                  <p className="error-message">{errors.password?.message}</p>
                ) : (
                  <></>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i class="ni ni-bold"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    placeholder="Ime Škole"
                    className="custom-input form-control"
                    {...register("name")}
                  />
                </InputGroup>
                {errors.name ? (
                  <p className="error-message">{errors.name?.message}</p>
                ) : (
                  <></>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i class="ni ni-square-pin"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="custom-input form-control"
                    placeholder="Adresa"
                    {...register("adress")}
                  />
                </InputGroup>
                {errors.adress ? (
                  <p className="error-message">{errors.adress?.message}</p>
                ) : (
                  <></>
                )}
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
              </div>
              <div className="text-center">
                <input
                  className="btn btn-primary"
                  value="Kreiraj"
                  type="submit"
                />
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
